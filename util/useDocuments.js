import {
  useEffect,
  useState,
} from 'react';

import {
  collection,
  getFirestore,
  onSnapshot,
} from 'firebase/firestore';

export function useDocuments(colName) {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const col = collection(getFirestore(), colName);
  useEffect(() => {
    const unsub = onSnapshot(col, (ref) => {
      let results = [];
      ref.forEach((document) => {
        results.push(document.data());
      });
      setDocuments(results);
      setIsLoading(false);
    });

    return () => unsub();
  }, [col]);

  return { documents, isLoading };
}
