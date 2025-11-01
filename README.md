# sorted-crackmes

A web application built with SvelteKit for exploring crackmes with sortable tables, filters, and pagination for reverse engineering enthusiasts.

## 🛠️ Installation

Before you begin, ensure you have the followings:

- [pnpm](https://pnpm.io/installation)
- [Node.js](https://pnpm.io/cli/env#add)

## **Setting Up the App**

1. Clone the repository:
   ```bash
   git clone https://github.com/kurtnettle/sorted-crackmes.git
   ```
2. Navigate to the `app` folder:
   ```bash
   cd sorted-crackmes
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Set up environment variables:

   Rename the a `.env.example` to `.env` file in the `app` folder and modify the following values:

   ```txt
   CHALLS_JSON_URL=""
   ```

   (check `crackmes-extractor/README` for details)

5. Run the development server:
   ```bash
   pnpm run dev
   ```

### ❓ Why this tool?

During a recent CTF, I attempted a Reverse Engineering (RE) challenge which is out of my domain. By following a writeup of an another CTF contest, I quickly managed to get the flag. Interests sparked. I began searching for RE resources and found `crackmes`, website a collection of RE challenges. Being a beginner I wanted to try the easier problem first. But unfortunately the website doesn't provide any basic data controls like the filtering or sorting. So I ended up building this tool for the solution.

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the tool or fix bugs, feel free to submit a pull request. Please ensure your changes align with the project's coding standards.

## 📜 License

This project is licensed under the GPLv3 License. See the [LICENSE](./LICENSE) file for full details.

By contributing to this project, you agree that your contributions will be licensed under the GPLv3 License as well.

## 💌 Acknowledgments

- Creators and maintainers of `crackmes` website
