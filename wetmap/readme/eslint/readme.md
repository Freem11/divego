# Setting Up ESLint Code Formatting in VSCode

ESLint is specified in dev dependecies for the project and a configuration file (`\eslint.config.mjs`) exists in the project root.
Follow these steps to ensure ESLint works correctly in VSCode.

---

## 1. Install the ESLint Extension for VSCode

1. Open **VSCode**.
2. Go to the **Extensions** panel (`Ctrl + Shift + X` on Windows/Linux or `Cmd + Shift + X` on macOS).
3. Search for **ESLint**.  [](extension.png)
4. Click **Install** on the ESLint extension by Microsoft.
5. Restart VSCode after installation.

---

## 2. Verify That ESLint is Working

1. Open the **ESLint output tab**:
   - Go to **View** > **Output** (`Ctrl + Shift + U`).
   - In the **Output** dropdown, select **ESLint**.
2. If ESLint is working correctly, you should see logs related to ESLint
3. If there are errors, check the **Problems** tab (`Ctrl + Shift + M`) for ESLint-related issues.
4. Normally you should see something like this:
```
[Info  - 8:22:39 PM] ESLint server is starting.
[Info  - 8:22:40 PM] ESLint server running in node v20.18.1
[Info  - 8:22:40 PM] ESLint server is running.
[Info  - 8:23:06 PM] ESLint library loaded from: ....
```

---

## 3. Ensure ESLint is Auto-Fixing Code on Save

To automatically format and fix linting issues on save:

1. Open **Command Palette** (`Ctrl + Shift + P`).
2. Search for `Preferences: Open Workspase settings (JSON)`.
4. Make sure you have the following configurations in your json:
   ```json
   {
    "editor.formatOnSave": true,
    "eslint.format.enable": true,
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
   }
   ```
5. Save the file and restart VSCode.

---

## 4. Final Check

Open a file with linting issues. What are linting issues? The simplest example is any string variable:
```
const a = "Hello world";
```
Current project configured to use single quotes for string variables. So if you use double quotes like in example above 
you'll see red underline saying there is an error: `Strings must use singlequote. eslint(@stylistic/quotes`)

When you save the file eslint will automatically replace double quotes to single quotes. The issue is fixed!

If everything works, you’re all set! 🎉

