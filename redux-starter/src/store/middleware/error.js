const error = (state) => (next) => (action) => {
  if (action.type === "error")
    console.log(`Toastify: ${action.payload.message}`);
};

export default error;
