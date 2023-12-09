import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email("Invalid email"),
  tagline: z.string().min(2),
  interests: z.string().min(5),
  skills: z.string().min(5),
  lookingFor: z.string().min(5),
  contact: z.string().min(2),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onBlur",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      tagline: "",
      interests: "",
      skills: "",
      lookingFor: "",
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("API response:", responseData);
      } else {
        console.error("API error:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    console.log(values);
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <>
        <main className="container flex h-screen flex-col items-center justify-center px-8 py-4">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Submitted Successfully ✅
          </h2>
          <p className="pb-4 text-center text-xl text-muted-foreground">
            Thanks for submitting.
            <br />
            You will receive shortly a list of your best matches.
          </p>
          <Button
            variant={"secondary"}
            onClick={() => {
              form.reset();
              setIsSubmitted(false);
            }}
          >
            Go Back
          </Button>
        </main>
      </>
    );
  }

  // tagline
  // 1-5 interests
  // text bigger
  // intro text at the top
  // bottom : contact info, socials, website link
  //

  return (
    <>
      <main className="container flex min-h-[calc(100vh-64px)] w-full max-w-xl flex-col px-8 py-4">
        <img src="/logo.png" alt="Logo" className="mb-5 max-w-xs" />
        <h2 className="scroll-m-20 pb-4 text-5xl font-semibold tracking-tight first:mt-0">
          Coincidence
        </h2>
        <p className="pb-4 text-xl text-muted-foreground">
          Find a teammate, friend, or long-term collaborators.
          <br />
          You will receive matches with common interests or with complementary
          skills.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel style={{ fontSize: "15px" }}>My name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel style={{ fontSize: "15px" }}>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="hello@abc.xyz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel style={{ fontSize: "15px" }}>
                    Myself in one sentence
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Cricket in heart, masala in soul"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel style={{ fontSize: "15px" }}>
                    My interests
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Futbol, Anime, Pav Bhaji" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel style={{ fontSize: "15px" }}>
                    I am strong in
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Networking, Game mechanics design"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lookingFor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel style={{ fontSize: "15px" }}>
                    I am looking for
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Backend, Branding" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel style={{ fontSize: "15px" }}>
                    How to contact me
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="@Balu on X" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t bg-background bg-opacity-0 p-2">
              <Button
                className="w-full "
                style={{ fontSize: "20px" }}
                type="submit"
                disabled={!form.formState.isValid}
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>

        <div className="h-16"></div>
      </main>
    </>
  );
}
