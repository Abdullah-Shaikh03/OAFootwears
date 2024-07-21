import './dashboard.css';

export default function Layout({ children }) {
    return (
        <html lang="en">
        <body className={``}>
            {children}
        </body>
        </html>
    );
}