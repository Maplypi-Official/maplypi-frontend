import { useState, useEffect } from 'react';

export const useNetworkSync = () => {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // محاكاة لجلب البيانات من السيرفر
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return { nodes, loading };
};
