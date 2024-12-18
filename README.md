<h1 align="center">Auth.js Mastery</h1>

<div align="center">

Learn advance authentication with [Auth.js](https://authjs.dev/)

</div>

<p align=center>
  <img width = "700px" alt="Jio Network blocking the view? Network switch reveals the magic!" src="./public/authjs-mastery-stack.png">
<p>

<div align= "center">

[![Twitter Badge](https://img.shields.io/badge/-@yntpdotme-1ca0f1?style=flat&labelColor=1ca0f1&logo=twitter&logoColor=white&link=https://twitter.com/yntpdotme)](https://twitter.com/yntpdotme) &nbsp; [![Linkedin Badge](https://img.shields.io/badge/-yntpdotme-0e76a8?style=flat&labelColor=0e76a8&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yntpdotme/) &nbsp; [![Mail Badge](https://img.shields.io/badge/-akashkadlag14-c0392b?style=flat&labelColor=c0392b&logo=gmail&logoColor=white)](mailto:akashkadlag14@gmail.com) &nbsp; [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)&nbsp; [![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

</div>

<h2 align="center">

<img src = "./public/eyes-to-see.gif" width = 26px align="top"/> &nbsp;[See it in Action](https://auth-mastery.vercel.app/) &nbsp;»

</h2>

<br>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> 
	·&nbsp;<a href="#features"><strong>Features</strong></a> 
	·&nbsp;<a href="#tech-stack"><strong>Tech Stack</strong></a>
	·&nbsp;<a href="#local-development"><strong>Development Setup</strong></a> 
	·&nbsp;<a href="#local-development"><strong>Contributing</strong></a> 
</p>

<br>

## <a name="introduction">❄️&nbsp;Introduction</a>

Welcome Auth.js Mastery, your ultimate guide to implementing robust authentication in Next.js using [Auth.js](https://authjs.dev/). This advance guide provides you with everything you need to authenticate modern web apps. Delve into the codebase to explore more.

<br>
<a href="https://auth-mastery.vercel.app/">
  <p align=center>
    <img width = "650px" alt="Jio Network blocking the view? Network switch reveals the magic!" src="./public/authjs-mastery.png">
  <p>
</a>
<br>

## <a name="features">🔋&nbsp; Features</a>

- &nbsp;🗃️&nbsp;&nbsp; Organized File and Folder Structure

- &nbsp;&nbsp;▲&nbsp;&nbsp; Next.js 15 with Server Actions

- &nbsp;🔑&nbsp;&nbsp; Credentials & OAuth Providers (Google & GitHub)

- &nbsp;🔒&nbsp;&nbsp; Forgot Password & Email Verification

- &nbsp;📱&nbsp;&nbsp; Two-Factor Authentication

- &nbsp;👥&nbsp;&nbsp; User Roles (Admin & User)

- &nbsp;🔓&nbsp;&nbsp; Login Component (Redirect or Modal)

- &nbsp;📝&nbsp;&nbsp; Registration & Forgot Password Components

- &nbsp;✅&nbsp;&nbsp; Verification & Error Components

- &nbsp;🚧&nbsp;&nbsp; Role-Based Access Gate

- &nbsp;🖥️&nbsp;&nbsp; Server & Client Component Examples

- &nbsp;🛡️&nbsp;&nbsp; Protect API Routes & Server Actions for Admins

- &nbsp;📧&nbsp;&nbsp; Change Email & Password with Verification in Settings

- &nbsp;🔔&nbsp;&nbsp; Enable/Disable 2FA in Settings

<br>

## <a name="tech-stack">⚙️&nbsp; Tech Stack</a>

- [Auth.js](https://authjs.dev/) – Open Source Authentication Solution

- [Next.Js](https://nextjs.org/) – React Framework

- [Prisma](https://www.prisma.io/orm) – ORM

- [Postgres](https://neon.tech/) - Database

- [Resend](https://resend.com/) – Email API For Developers

- [Shadcn UI](https://ui.shadcn.com/) – Component library

- [Tailwind CSS](https://tailwindcss.com/) – CSS

- [TypeScript](https://www.typescriptlang.org/) - TypeSafe JavaScript

- [Zod](https://zod.dev/) - Schema Declaration & Validation Library

- [React Hook Form](https://react-hook-form.com/) - Forms Library for React

- [Git](https://git-scm.com/) – Versioning

- [Vercel](https://vercel.com/) – Deployments

<br>

## <a name="local-development"> 🖥️&nbsp;&nbsp; Local Development</a>

0.  **Prerequisites** <br>
    Make sure you have the following installed on your machine:

    - [Git](https://git-scm.com/)
    - [Node.js](https://nodejs.org/en)
    - [pnpm](https://pnpm.io/) (Package Manager)

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yntpdotme/authjs-mastery.git
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd authjs-msatery
    ```

3.  **Install dependencies:**

    ```bash
    pnpm install
    ```

4.  **Add Environment Variables:**

    Create `.env` file in the root folder and copy paste the content of `.env.sample`

    ```bash
    cp .env.sample .env
    ```

    Update credentials in `.env` with your credentials.

5.  **Setup Prisma**

    ```bash
    pnpm prisma generate
    pnpm dlx prisma db push
    ```

6.  **Start the App:**

    ```bash
    pnpm dev
    ```

    Visit &nbsp;[https://localhost:3000](https://localhost:3000)&nbsp; to access your app.

7.  **Start Prisma Studio:**

    ```bash
    pnpm prisma studio
    ```

    Visit &nbsp;[https://localhost:5555](https://localhost:5555)&nbsp; to access prisma studio.

<br>

## 🤝&nbsp;&nbsp;Contributing

Contributions are always welcome!
See [CONTRIBUTING.md](./CONTRIBUTING.md) for ways to get started.

</br>

## 🪪&nbsp;&nbsp; License

Auth.js Mastery is open-source under the [MIT License](./LICENSE).
Feel free to learn, add upon, and share!
