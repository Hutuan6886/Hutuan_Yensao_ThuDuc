import React, { FormHTMLAttributes, forwardRef } from "react";

interface FormContainerProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}
const FormContainer = forwardRef<HTMLFormElement, FormContainerProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <form ref={ref} {...props} className={`w-[80%] m-auto flex flex-col gap-8 ${className}`}>
        {children}
      </form>
    );
  }
);
export default FormContainer;
