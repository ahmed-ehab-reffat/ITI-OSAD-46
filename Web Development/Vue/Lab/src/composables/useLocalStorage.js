import {ref, watch} from 'vue';

export function useLocalStorage(key, defaultValue) {
  let initial = defaultValue;
  try {
    const stored = localStorage.getItem(key);
    if (stored !== null) {
      initial = JSON.parse(stored);
    }
  } catch {
    initial = defaultValue;
  }

  const data = ref(initial);

  watch(
    data,
    (newValue) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch {
        console.error('saving data in local storage');
      }
    },
    {deep: true}
  );

  return data;
}
