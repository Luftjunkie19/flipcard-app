import {
  useEffect,
  useState,
} from 'react';

import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore';

export function useDocument(col, id) {
  const [document, setDocument] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  const firestore = getFirestore();

  const collect = collection(firestore, col);

  const documentId = doc(collect, id);
  useEffect(() => {
    const unsub = onSnapshot(
      documentId,
      (ref) => {
        setDocument(ref.data());
        setIsloading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsub();
  }, [col, id, documentId]);

  return { document };
}
