export function createTriggerFunction(ref, trigger, setTrigger) {
  function setValueAndTrigger(value) {
    ref.current = value;
    setTrigger(!trigger);
  }

  return setValueAndTrigger;
}
