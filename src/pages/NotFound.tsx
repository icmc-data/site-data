
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ParticlesBackground } from "@/components/ParticlesBackground";

const NotFound = () => {
  return (
    <>
      <ParticlesBackground />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-6xl font-bold text-data-purple mb-4">404</h1>
          <p className="text-xl mb-8">Oops! Página não encontrada.</p>
          <Link to="/">
            <Button className="bg-data-purple hover:bg-data-purple-dark">
              Voltar para a Home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
