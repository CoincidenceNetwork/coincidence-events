import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Header></Header>
      <main className="container flex min-h-[calc(100vh-64px)] w-full flex-col px-8 py-4">
        <div className="flex w-full flex-col items-end">
          <Button onClick={() => setIsEditing(!isEditing)}>Edit Profile</Button>
        </div>
        {/* Section 1 */}
        <div className="flex flex-col items-center justify-center gap-4">
          <img
            className="w-32 rounded-full"
            alt="Avatar"
            src="https://dummyimage.com/200x200"
          />

          <h2 className="text-xl font-bold">Vitalik</h2>
          <p className="text-center text-xl text-muted-foreground">
            A modal dialog that interrupts the user with important content and
            expects a response.
          </p>
        </div>
        <Separator className="my-4" />

        {/* Section 2 */}
        <div className="mt-6">
          <h2 className="text-xl font-bold">Interests</h2>
          <Textarea className="mt-2 h-32 w-full rounded border border-gray-300 p-2"></Textarea>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold">Skills</h2>
          <Textarea className="mt-2 h-32 w-full rounded border border-gray-300 p-2"></Textarea>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-bold">Looking for</h2>
          <Textarea className="mt-2 h-32 w-full rounded border border-gray-300 p-2"></Textarea>
        </div>

        {/* Section 3 */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Contexts</h2>
            <Button className="p-2">
              <PlusCircle />
            </Button>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Event 1</Label>
          </div>
        </div>

        <div className="h-24"></div>
      </main>
    </>
  );
};

export default ProfilePage;
