"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Github } from "lucide-react"

interface GithubProfile {
  name: string
  username: string
  avatar: string
}

const profiles: GithubProfile[] = [
  {
    name: "Raffaele Cavallari",
    username: "cxvallari",
    avatar: "https://github.com/cxvallari.png",
  },
  {
    name: "Leonardo Salani",
    username: "salanileo",
    avatar: "https://github.com/salanileo.png",
  },
  {
    name: "Luca Yang",
    username: "nonloso1",
    avatar: "https://github.com/nonloso1.png",
  },
  {
    name: "Flavio Carlini",
    username: "nonloso2",
    avatar: "https://github.com/nonloso2.png",
  },
]

export function ContactPopup() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="w-full sm:w-auto">
          Contattaci
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Il nostro team</DialogTitle>
          <DialogDescription>Contatta uno dei nostri sviluppatori per maggiori informazioni.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {profiles.map((profile) => (
            <a
              key={profile.username}
              href={`https://github.com/${profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-4 rounded-lg border hover:bg-secondary/50 transition-colors"
            >
              <img
                src={profile.avatar || "/placeholder.svg"}
                alt={profile.name}
                className="w-16 h-16 rounded-full mb-2"
              />
              <span className="font-medium">{profile.name}</span>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Github className="h-3 w-3 mr-1" />
                {profile.username}
              </div>
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
