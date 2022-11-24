import { ref, onMounted, onUnmounted, Ref } from "vue";
const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false);
  const handleIsOpen = (e: MouseEvent) => {
    if (elementRef.value) {
      if (
        elementRef.value.contains(e.target as HTMLElement) &&
        !isClickOutside.value
      ) {
        isClickOutside.value = true;
      } else {
        isClickOutside.value = false;
      }
    }
  };
  onMounted(() => {
    document.addEventListener("click", handleIsOpen);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleIsOpen);
  });
  return isClickOutside;
};

export default useClickOutside;
