import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function JoinDocumentForm() {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [docLink, setDocLink] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function extractRoomId(link: string) {
    try {
      const url = new URL(link);
      const match = url.pathname.match(/room\/(.+)$/);
      if (match) return match[1];
    } catch {
      // not a valid URL
    }
    return null;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!userName.trim() || !docLink.trim()) {
      setError("Please enter your name and a document link.");
      return;
    }
    const roomId = extractRoomId(docLink);
    if (!roomId) {
      setError("Invalid document link.");
      return;
    }
    setError("");
    setOpen(false);
    navigate(`/room/${encodeURIComponent(roomId)}` + `?name=${encodeURIComponent(userName)}`);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="w-full mt-4">or join an existing document</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto p-8 space-y-6 bg-card shadow-xl rounded-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-2 text-center">Join an existing document</h2>
          <div className="flex flex-col gap-2">
            <Label htmlFor="docLink">Document Link</Label>
            <Input
              id="docLink"
              value={docLink}
              onChange={e => setDocLink(e.target.value)}
              placeholder="Paste the document link"
              autoFocus
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="userName">Your Name</Label>
            <Input
              id="userName"
              value={userName}
              onChange={e => setUserName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          {error && <div className="text-destructive text-sm">{error}</div>}
          <Button type="submit" className="w-full mt-2">Join</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
