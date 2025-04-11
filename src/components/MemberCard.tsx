import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Users, BookOpen, Star, Mic, Megaphone, Book, ClipboardList, Crown } from "lucide-react";
import type { Member } from "@/utils/fetch-members";

interface MemberCardProps {
  member: Member;
}

const categoryIcons: Record<string, JSX.Element> = {
  all: <Users className="w-3 h-3 mr-1" />,
  Teaching: <BookOpen className="w-3 h-3 mr-1" />,
  Projects: <Star className="w-3 h-3 mr-1" />,
  Events: <Mic className="w-3 h-3 mr-1" />,
  Marketing: <Megaphone className="w-3 h-3 mr-1" />,
  "Study Group": <Book className="w-3 h-3 mr-1" />,
  Secretariat: <ClipboardList className="w-3 h-3 mr-1" />,
  Coordinators: <Crown className="w-3 h-3 mr-1" />,
};

export function MemberCard({ member }: MemberCardProps) {
  return (
    <Card className="flex flex-col bg-card/80 backdrop-blur-sm border-border overflow-hidden">
      {/* Imagem fixa no topo */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={member.photo}
          alt={member.name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Conteúdo flexível e botão fixado na base */}
      <CardContent className="flex flex-col flex-1 p-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{member.description}</p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {member.categories.map((category) => (
              <Badge key={category} variant="outline" className="text-xs inline-flex items-center">
                {categoryIcons[category] ?? null}
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {member.linkedin && (
          <div className="mt-auto flex justify-end">
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
