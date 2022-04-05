import { useForm } from "@formspree/react";
import Button from "components/Button";
import Input from "components/Input";
import TextArea from "components/TextArea";

export default function Contact() {
  const [state, handleSubmit] = useForm("mknyoenk"); // TODO: Bad security, move this to env

  // TODO: Make as a formik form

  return (
    <>
      <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
        <div className="relative max-w-xl mx-auto">
          {state.succeeded ? (
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 text-center">
              I'll get back to you as soon as possible!
            </p>
          ) : (
            <>
              <div className="text-center">
                <h2 className="text-base font-semibold text-theme-5 tracking-wide uppercase">
                  What now?
                </h2>
                <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  Get in touch
                </h2>
                <p className="mt-4 text-lg leading-6 text-gray-500">
                  Whether you have a question or just want to say hi, my inbox
                  is always open. I'll try to get back to you as soon as
                  possible!
                </p>
              </div>
              <div className="mt-12">
                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                >
                  <Input
                    label="First name"
                    name="first_name"
                    id="first_name"
                    autoComplete="given-name"
                    placeholder="John"
                  />
                  <Input
                    label="Last name"
                    name="first_name"
                    id="first_name"
                    autoComplete="given-name"
                    placeholder="Doe"
                  />
                  <div className="sm:col-span-2">
                    <Input
                      label="Email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      placeholder="johndoe@gmail.com"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <TextArea
                      label="Message"
                      id="message"
                      name="message"
                      placeholder="Hi Nikolai! I'm interested in collaborating on an exciting new project..."
                      rows={5}
                      className="resize-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" className="w-full">
                      Say hello
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
