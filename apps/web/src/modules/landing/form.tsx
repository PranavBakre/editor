import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function LandingPageForm() {
  const [userName, setUserName] = useState("");
  const [docName, setDocName] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [error, setError] = useState("");

  const [searchParams, setSearchParams] = useSearchParams({ view: "create" });
  const view = searchParams.get("view");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userName.trim() || !docName.trim()) {
      setError("Please enter your name and a document name.");
      return;
    }
    setError("");
    navigate(
      `/room/${encodeURIComponent(docName)}` +
        `?name=${encodeURIComponent(userName)}`
    );
  };
  return (
    <Card className="border-none max-w-md w-full mx-auto p-8 space-y-6 bg-surface-dark shadow-black/30 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-100">
            Collaborate in Real-Time
          </h1>
          <p className="text-stone-400 mt-2">
            Create a new document or join an existing one.
          </p>
        </div>
        <div className="flex flex-col">
          <Label
            htmlFor="userName"
            className="block text-sm font-medium text-stone-300 mb-1"
          >
            Your Name
          </Label>
          <Input
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="bg-surface-light border-none ring ring-surface-border rounded-md text-stone-100 placeholder-gray-500 text-base"
            autoFocus
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="docName"
            className="block text-sm font-medium text-stone-300 mb-1"
          >
            Document Name
          </Label>
          <Input
            id="docName"
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
            placeholder="Enter document name"
            required
          />
        </div>
        {error && <div className="text-destructive text-sm">{error}</div>}
        <Button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-brand hover:bg-brand-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-dark focus:ring-brand-accent transition-colors duration-200"
        >
          {view === "create" ? "Let's begin" : "Join Document"}
        </Button>
        <div className="flex justify-center">
          <Button
            variant="link"
            className="text-brand-accent cursor-pointer"
            onClick={() =>
              setSearchParams({ view: view === "create" ? "join" : "create" })
            }
          >
            {view === "create"
              ? "Or join an existing document"
              : "Or create a new document"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
