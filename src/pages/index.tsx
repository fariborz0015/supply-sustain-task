import { Input } from "@/components/ui/Input";
import * as Yup from "yup";
import { Icon } from "@iconify/react";

export default function Home() {
  return (
    <main className="p-4 w-screen h-screen flex items-center justify-center">
      <div className="max-w-sm space-y-4 w-full">
        {/* Input with Multiple Features */}
        <div className="mb-4">
          <ul className="text-gray-700 mb-4 ps-4 list-disc">
            <li>Filled Mode</li>
            <li>Success Mode</li>
            <li>Has Start Adornment</li>
            <li>Has End Adornment</li>
            <li>Has Label</li>
          </ul>
          <Input
            startAdornment={
              <Icon icon="solar:user-bold-duotone" className="size-7" />
            }
            endAdornment={
              <Icon icon="solar:bill-check-bold-duotone" className="size-7" />
            }
            label="First Name"
            variant="success"
            value="Fariborz Shalghooni"
          />
        </div>

        {/* Basic Input with Placeholder */}
        <div className="mb-4">
          <ul className="text-gray-700 mb-4 ps-4 list-disc">
            <li>Default Mode</li>
          </ul>
          <Input type="text" placeholder="Enter your name" />
        </div>
        <div className="mb-4">
          <ul className="text-gray-700 mb-4 ps-4 list-disc">
            <li>Default Mode</li>
            <li>Validation Applied</li>
          </ul>
          <Input
            type="text"
            placeholder="Enter your Email"
            validation={Yup.string()
              .email("Invalid email")
              .required("Email is required")}
          />
        </div>

        {/* Input with Error State */}
        <div className="mb-4">
          <ul className="text-gray-700 mb-4 ps-4 list-disc">
            <li>Error Mode</li>
            <li>Has Label</li>
            <li>Has Placeholder</li>
            <li>Validation Applied</li>
          </ul>
          <Input
            type="text"
            label="Email"
            placeholder="Enter your email"
            variant="error"
            validation={Yup.string()
              .email("Invalid email")
              .required("Email is required")}
          />
        </div>
        <div className="mb-4">
          <ul className="text-gray-700 mb-4 ps-4 list-disc">
            <li>Label Shrink</li>
          </ul>
          <Input
            type="text"
            label="Email"
            placeholder="Enter your email"
            variant="error"
            labelShrink={true}
            validation={Yup.string()
              .email("Invalid email")
              .required("Email is required")}
          />
        </div>
        <div className="mb-4">
          <ul className="text-gray-700 mb-4 ps-4 list-disc">
            <li>On Invalid Handler</li>
          </ul>
          <Input
            type="text"
            label="Email"
            placeholder="Enter your email"
            onInvalid={(error) => alert(error.message)}
            validation={Yup.string()
              .email("Invalid email")
              .required("Email is required")}
          />
        </div>
        <div className="mb-4">
          <ul className="text-gray-700 mb-4 ps-4 list-disc">
            <li>disabled </li>
          </ul>
          <Input
            type="text"
            label="Email"
            placeholder="Enter your email"
            disabled
            onInvalid={(error) => alert(error.message)}
            validation={Yup.string()
              .email("Invalid email")
              .required("Email is required")}
          />
        </div>

        {/* RTL Input */}
        <div className="mb-4 ">
          <ul className="text-gray-700 mb-4 ps-4 list-disc">
            <li>RTL </li>
          </ul>
          <Input
            dir="rtl"
            type="text"
            label="نام خانوادگی"
            placeholder="نام خانوادگی خود را وارد کنید"
          />
        </div>
      </div>
    </main>
  );
}
