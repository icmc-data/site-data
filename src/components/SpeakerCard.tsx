
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { type Speaker } from "@/utils/fetch-events";

interface SpeakerCardProps {
  speaker: Speaker;
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border-border">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={speaker.photo}
          alt={speaker.name}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{speaker.name}</h3>
        <p className="text-primary font-medium mb-3">{speaker.title}</p>
        
        <div className="relative">
          <p className={`text-sm text-muted-foreground ${!expanded ? "line-clamp-3" : ""}`}>
            {speaker.bio}
          </p>
          
          <Button
            variant="ghost"
            size="sm"
            className="mt-2 w-full flex items-center justify-center"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                <ChevronUp size={16} className="mr-1" /> Ver menos
              </>
            ) : (
              <>
                <ChevronDown size={16} className="mr-1" /> Ver mais
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
