
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin } from "lucide-react";
import type { Member } from "@/utils/fetch-members";

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border-border">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={member.photo}
          alt={member.name}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{member.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {member.categories.map((category) => (
            <Badge key={category} variant="outline" className="text-xs">
              {category}
            </Badge>
          ))}
        </div>
        
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        )}
      </CardContent>
    </Card>
  );
}
