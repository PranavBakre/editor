import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import JoinDocumentForm from "./join-document-form";

export default function CreateDocumentForm() {
  const [userName, setUserName] = useState("");
  const [docName, setDocName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!userName.trim() || !docName.trim()) {
      setError("Please enter your name and a document name.");
      return;
    }
    setError("");
    navigate(`/room/${encodeURIComponent(docName)}` + `?name=${encodeURIComponent(userName)}`);
  }

  return (
    <Card className="max-w-md mx-auto p-8 space-y-6 bg-card shadow-xl rounded-xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-2 text-center">Create a new document</h2>
        <div className="flex flex-col gap-2">
          <Label htmlFor="userName">Your Name</Label>
          <Input
            id="userName"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            placeholder="Enter your name"
            autoFocus
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="docName">Document Name</Label>
          <Input
            id="docName"
            value={docName}
            onChange={e => setDocName(e.target.value)}
            placeholder="Enter document name"
            required
          />
        </div>
        {error && <div className="text-destructive text-sm">{error}</div>}
        <Button type="submit" className="w-full mt-2">Create & Join</Button>
      </form>
      <div className="text-center mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="text-sm text-primary underline hover:text-primary/80 w-full">or join an existing document</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md mx-auto p-8 space-y-6 bg-card shadow-xl rounded-xl">
            <JoinDocumentForm />
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
}
