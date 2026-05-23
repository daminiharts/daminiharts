// utils/toast.js
export const toast = (() => {
  const createContainer = () => {
    let container = document.getElementById("custom-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "custom-toast-container";
      container.className = "fixed top-20 right-6 z-[9999] space-y-3";
      document.body.appendChild(container);
    }
    return container;
  };

 const show = (message, type = "default", duration = 3000) => {
  const container = createContainer();

  const toast = document.createElement("div");
  toast.className = `
    px-4 py-2 min-w-[200px] rounded shadow-lg text-sm font-medium animate-fade-in
    bg-black text-white
  `;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("animate-fade-out");
    setTimeout(() => toast.remove(), 400);
  }, duration);
};


  return { show };
})();
