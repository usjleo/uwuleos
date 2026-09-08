import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  Firestore,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// Firebase credentials configuration from environment variables (client-safe)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/**
 * Checks if Firebase has been configured with real non-placeholder credentials
 */
export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.projectId &&
      !firebaseConfig.apiKey.includes("your_api_key") &&
      !firebaseConfig.projectId.includes("your_project_id")
  );
}

// Safe singleton Firebase app initialization
let app: FirebaseApp | undefined = undefined;
let db: Firestore | undefined = undefined;

if (typeof window !== "undefined" || isFirebaseConfigured()) {
  try {
    if (isFirebaseConfigured()) {
      app = getApps().length ? getApp() : initializeApp(firebaseConfig);
      db = getFirestore(app);
    }
  } catch (error) {
    console.warn("Firebase initialization skipped or encountered error:", error);
  }
}

export { app, db };

/**
 * Fetch all documents from a Firestore collection with fallback to initial static JSON/local data
 */
export async function getFirestoreCollection<T extends { id: string }>(
  collectionName: string,
  fallbackData: T[]
): Promise<T[]> {
  if (!isFirebaseConfigured() || !db) {
    return fallbackData;
  }

  try {
    const colRef = collection(db, collectionName);
    const snap = await getDocs(colRef);
    if (snap.empty) {
      return fallbackData;
    }

    const items: T[] = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data() as T;
      items.push({ ...data, id: docSnap.id });
    });

    return items;
  } catch (err) {
    console.warn(`Firestore read failed for collection "${collectionName}":`, err);
    return fallbackData;
  }
}

/**
 * Save or update a document in a Firestore collection
 */
export async function saveFirestoreDoc(
  collectionName: string,
  docId: string,
  data: Record<string, any>
): Promise<boolean> {
  if (!isFirebaseConfigured() || !db) {
    return false;
  }

  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
    return true;
  } catch (err) {
    console.error(`Firestore save failed for ${collectionName}/${docId}:`, err);
    return false;
  }
}

/**
 * Delete a document from Firestore
 */
export async function deleteFirestoreDoc(
  collectionName: string,
  docId: string
): Promise<boolean> {
  if (!isFirebaseConfigured() || !db) {
    return false;
  }

  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error(`Firestore delete failed for ${collectionName}/${docId}:`, err);
    return false;
  }
}

/**
 * Save a new student membership applicant to Firestore
 */
export async function submitMembershipApplicant(applicantData: {
  name: string;
  regNo: string;
  faculty: string;
  academicYear: string;
  email: string;
  phone: string;
  interests: string;
}): Promise<{ success: boolean; id?: string }> {
  if (!isFirebaseConfigured() || !db) {
    return { success: false };
  }

  try {
    const colRef = collection(db, "membership_applicants");
    const docRef = await addDoc(colRef, {
      ...applicantData,
      status: "pending",
      appliedDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (err) {
    console.error("Failed to submit applicant to Firestore:", err);
    return { success: false };
  }
}

/**
 * Submit contact message to Firestore
 */
export async function submitContactForm(messageData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean }> {
  if (!isFirebaseConfigured() || !db) {
    return { success: false };
  }

  try {
    const colRef = collection(db, "contact_inquiries");
    await addDoc(colRef, {
      ...messageData,
      timestamp: serverTimestamp(),
      receivedDate: new Date().toISOString(),
    });
    return { success: true };
  } catch (err) {
    console.error("Failed to submit contact message to Firestore:", err);
    return { success: false };
  }
}
