import HeaderPage from '@/components/shared/header/index'
import FooterPage from '@/components/footer';
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen flex-col">
            <HeaderPage />
            <main className="flex-1 wrapper">{children}</main>
            <FooterPage />
        </div>
    );
}