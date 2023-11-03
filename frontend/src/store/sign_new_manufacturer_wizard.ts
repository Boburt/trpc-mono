import { atom, action, task, computed } from "nanostores";

export const $currentStep = atom<number>(1);

export const $isFirstStep = computed($currentStep, (step) => step === 1);

export const $isLastStep = computed($currentStep, (step) => step === 3);

export const $nextStep = action($currentStep, "$nextStep", (store) => {
  store.set(store.get() + 1);
  return store.get();
});

export const $prevStep = action($currentStep, "$prevStep", (store) => {
  if (store.get() > 1) store.set(store.get() - 1);
  return store.get();
});
