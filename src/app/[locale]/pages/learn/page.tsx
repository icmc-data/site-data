"use client";
import { useTranslations } from 'next-intl';
import PostList from '../../components/PostList';
import { useEffect, useState } from 'react';

export default function Learn() {
  const t = useTranslations('');
  const locale = t('DONT_DELETE'); // Obtém o valor da variável DONT_DELETE
  const [markdownFiles, setMarkdownFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMarkdownFiles = async () => {
      setLoading(true); // Inicia o carregamento
      let fileNumber = 1;
      const contents = [];
      const folder = locale; // Usar diretamente o valor de DONT_DELETE para a pasta

      console.log(`Carregando posts da pasta: ${folder}`); // Verificar se o valor da pasta está correto

      while (true) {
        const file = `/learnPosts/${folder}/${fileNumber}.md`;
        console.log(`Tentando carregar: ${file}`); // Log do arquivo que está tentando carregar

        try {
          const response = await fetch(file);
          if (!response.ok) {
            console.log(`Arquivo não encontrado: ${file}`); // Log quando o arquivo não é encontrado
            break; // Para o loop se o arquivo não existir
          }
          const content = await response.text();
          contents.push(content);
          fileNumber++;
        } catch (error) {
          console.log(`Erro ao carregar o arquivo: ${file}`, error); // Log do erro, se ocorrer
          break; // Sai do loop em caso de erro
        }
      }

      console.log('Posts carregados:', contents); // Log dos posts carregados

      // Inverte a ordem para que o mais recente seja exibido primeiro
      setMarkdownFiles(contents.reverse());
      setLoading(false); // Finaliza o carregamento
    };

    loadMarkdownFiles();
  }, [locale]); // Recarrega os posts se o valor de DONT_DELETE mudar

  return (
    <div className='px-32 py-24 text-center text-2xl'>
      {loading ? (
        <div>{t('Loading_Content')}</div>
      ) : markdownFiles.length > 0 ? (
        <>
          <PostList markdownFiles={markdownFiles} />
          <div className="mt-10 text-left">
          </div>
        </>
      ) : (
        <div>{t('No_Posts')}</div>
      )}
    </div>
  );
}
