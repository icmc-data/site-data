import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Linkedin,
  Users,
  BookOpen,
  Star,
  Mic,
  Megaphone,
  Book,
  ClipboardList,
  Crown,
} from "lucide-react";
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
    <Card className="flex flex-col h-[460px] max-w-[300px] bg-card/80 backdrop-blur-sm border-border overflow-hidden group transition-all duration-300">
      {/* imagem com altura fixa, zoom default, sem zoom no hover */}
      <div className="relative w-full h-[250px] overflow-hidden bg-muted flex items-center justify-center">
        <img
          src={member.photo}
          alt={member.name}
          className="object-contain w-full h-full transform scale-[1.2] group-hover:scale-100 group-focus-within:scale-100 transition-transform duration-300 ease-in-out"
        />
      </div>

      <CardContent className="flex flex-col flex-1 p-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">{member.name}</h3>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
            {member.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-3">
            {member.categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className="text-xs inline-flex items-center"
              >
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
