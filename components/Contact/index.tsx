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
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Get in touch
                </h2>
                <p className="mt-4 text-lg leading-6 text-gray-500">
                  My inbox is always open. Whether you have a question or just
                  want to say hi, I'll try my best to get back to you!
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
                    placeholder="Thomas"
                  />
                  <Input
                    label="Last name"
                    name="first_name"
                    id="first_name"
                    autoComplete="given-name"
                    placeholder="Shelby"
                  />
                  <div className="sm:col-span-2">
                    <Input
                      label="Email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      placeholder="thomas@shelby.com"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <TextArea
                      label="Message"
                      id="message"
                      name="message"
                      placeholder="Hey Nikolai! We're interested in working with you on an exciting new project..."
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
