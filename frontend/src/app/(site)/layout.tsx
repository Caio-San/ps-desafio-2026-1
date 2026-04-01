import {Header} from './_components/Header';

//importando a header para o layout do site, para que ele apareça em todas as páginas do site
export default function SiteLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}