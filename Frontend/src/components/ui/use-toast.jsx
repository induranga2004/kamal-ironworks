import * as React from "react";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";

const ToastContext = React.createContext({});

function ToastContextProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        setToasts,
        toast: ({ ...props }) => {
          const id = Math.random().toString(36).substring(2, 9);
          setToasts((prevToasts) => [...prevToasts, { ...props, id }]);
          return id;
        },
        dismiss: (toastId) => {
          setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== toastId)
          );
        },
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

function useToast() {
  const context = React.useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return {
    toast: context.toast,
    dismiss: context.dismiss,
    toasts: context.toasts,
  };
}

function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, status, ...props }) => (
        <Toast
          key={id}
          onOpenChange={(open) => {
            if (!open) dismiss(id);
          }}
          variant={status === "error" ? "destructive" : undefined}
          {...props}
        >
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && (
              <ToastDescription>{description}</ToastDescription>
            )}
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}

export { useToast, Toaster, ToastContextProvider };
