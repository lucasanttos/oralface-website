OralFace - Landing Page Premium para Clínica Integrada

Nota: Projeto desenvolvido como demonstração de habilidades em Front-end Development e UI/UX Design.

🚀 Sobre o Projeto

Este projeto consiste em uma Landing Page de Alta Conversão desenvolvida para a clínica OralFace, especializada em urgência odontológica e saúde integrada.

O objetivo principal foi criar uma experiência digital que transmitisse confiança, modernidade e acessibilidade, pilares essenciais para o setor de saúde. A interface foi projetada com foco em Mobile First, garantindo que pacientes em situação de urgência consigam navegar e agendar consultas rapidamente de qualquer dispositivo.

🛠️ Tecnologias & Ferramentas

O projeto foi construído utilizando uma stack moderna focada em performance e experiência de desenvolvimento:

React 18: Biblioteca principal para construção da UI baseada em componentes.

Vite: Build tool de próxima geração para um ambiente de desenvolvimento extremamente rápido.

Tailwind CSS v3: Framework CSS utility-first para estilização rápida, responsiva e consistente.

Lucide React: Biblioteca de ícones leve e consistente.

Intersection Observer API: Utilizada para criar animações de "Scroll Reveal" performáticas sem depender de bibliotecas pesadas de animação.

✨ Funcionalidades e Destaques de UX

1. Navegação Imersiva e Inteligente

Navbar Dinâmica: A barra de navegação reage ao scroll, aplicando efeitos de glassmorphism (vidro fosco) e reduzindo seu tamanho para maximizar a área de conteúdo visível.

Smooth Scroll: Navegação suave entre as seções, com compensação automática da altura do header fixo.

2. Animações e Micro-interações

Scroll Reveal Engine: Implementei um Custom Hook e componentes reutilizáveis para animar elementos conforme eles entram na viewport, guiando o olhar do usuário.

Feedback Visual: Botões e cards possuem estados de hover sofisticados com sombras coloridas e transições de escala, proporcionando uma sensação tátil à interface.

3. Foco em Conversão (CRO)

CTAs Estratégicos: Botões de "Agendar via WhatsApp" posicionados contextualmente e sempre visíveis na versão mobile.

Mensagens Pré-preenchidas: A integração com a API do WhatsApp gera mensagens personalizadas baseadas no contexto (ex: "Gostaria de agendar com Dr. Caio"), reduzindo o atrito para o usuário.

4. Arquitetura de Componentes

O código foi estruturado pensando em escalabilidade. Dados como serviços, membros da equipe e convênios estão separados da camada de apresentação, facilitando a manutenção futura por qualquer desenvolvedor.

📸 Estrutura do Código

Exemplo de como a lógica de animação foi encapsulada para manter os componentes limpos:

// Hook personalizado para revelar elementos ao rolar
const Reveal = ({ children, delay = 0, direction = 'up' }) => {
  // Lógica usando IntersectionObserver para alta performance...
  return (
    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </div>
  );
};


🔧 Como Rodar o Projeto Localmente

Clone o repositório:

git clone [https://github.com/SEU-USUARIO/oralface-website.git](https://github.com/SEU-USUARIO/oralface-website.git)


Instale as dependências:

cd oralface-website
npm install


Inicie o servidor de desenvolvimento:

npm run dev


Acesse http://localhost:5173 no seu navegador.

👨‍💻 Sobre o Desenvolvedor

Este projeto foi desenvolvido por [Lucas Santos / UiCode.dev].

Sou um Desenvolvedor Front-end focado em criar interfaces que não são apenas visualmente impactantes, mas que também resolvem problemas reais de negócio através de código limpo e performático.
