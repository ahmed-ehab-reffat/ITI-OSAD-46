function twoParameters(param1, param2) {
  try {
    if (arguments.length !== 2) {
      throw new Error(
        `Expected 2 parameters, but received ${arguments.length}.`
      );
    }

    console.log("Success! Parameters received:", param1, param2);
  } catch (error) {
    console.error(error.message);
  }
}

twoParameters(1, 2);
twoParameters(1);
twoParameters(1, 2, 3);
