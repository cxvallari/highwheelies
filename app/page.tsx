import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ContactPopup } from "@/components/contact-popup"
import { GaugeCircle, BarChart3, Zap, ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground" data-theme="dark">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <GaugeCircle className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Highwheelies</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#funzionalita" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Funzionalità
            </Link>
            <Link href="#come-funziona" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Come Funziona
            </Link>
            <Link href="#chi-siamo" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Chi Siamo
            </Link>
            <Link href="#contatti" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Contatti
            </Link>
          </nav>
          <div className="flex items-center gap-2 md:gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="hidden md:inline-flex">
                Accedi
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm">Inizia</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Button - Only visible on small screens */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <Button className="rounded-full w-12 h-12 p-0 shadow-lg">
          <span className="sr-only">Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20 lg:py-32">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tighter mb-6">
            Sistema Avanzato di <span className="text-primary">Misurazione</span> Velocità
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-[800px] mb-8 md:mb-10">
            Highwheelies offre tecnologia all'avanguardia per la misurazione precisa della velocità dei veicoli su piste
            e circuiti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Visualizza Demo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <ContactPopup />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funzionalita" className="py-16 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Funzionalità Principali</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background/50 backdrop-blur">
              <GaugeCircle className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Misurazioni Precise</h3>
              <p className="text-muted-foreground">
                Tecnologia radar ad alta precisione che fornisce misurazioni con un'accuratezza fino a ±1 km/h.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background/50 backdrop-blur">
              <BarChart3 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Analisi in Tempo Reale</h3>
              <p className="text-muted-foreground">
                Elaborazione e visualizzazione istantanea dei dati con dashboard personalizzabili.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-background/50 backdrop-blur">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Velocità di Elaborazione</h3>
              <p className="text-muted-foreground">
                Elaborazione rapida di migliaia di misurazioni al minuto con risultati immediati.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="come-funziona" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Come Funziona</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-lg border border-border">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                1
              </div>
              <h3 className="text-lg font-bold mb-2">Installazione</h3>
              <p className="text-muted-foreground">
                I nostri sensori vengono installati in posizioni strategiche lungo la pista.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                2
              </div>
              <h3 className="text-lg font-bold mb-2">Rilevamento</h3>
              <p className="text-muted-foreground">
                La tecnologia radar avanzata rileva i veicoli e misura la loro velocità con precisione.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                3
              </div>
              <h3 className="text-lg font-bold mb-2">Elaborazione</h3>
              <p className="text-muted-foreground">
                I dati vengono elaborati in tempo reale e inviati alla nostra piattaforma cloud sicura.
              </p>
            </div>
            <div className="p-6 rounded-lg border border-border">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-4">
                4
              </div>
              <h3 className="text-lg font-bold mb-2">Analisi</h3>
              <p className="text-muted-foreground">
                Accedi ad analisi complete attraverso la nostra intuitiva interfaccia dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contatti" className="py-16 md:py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Pronto a misurare con precisione?</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] mx-auto mb-6 md:mb-8">
            Unisciti a centinaia di organizzazioni che utilizzano Highwheelies per monitorare la velocità dei veicoli.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Inizia Oggi
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <ContactPopup />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GaugeCircle className="h-5 w-5 text-primary" />
                <span className="font-bold">Highwheelies</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Soluzioni avanzate per la misurazione della velocità dei veicoli.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Prodotto</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Funzionalità
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Prezzi
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Casi Studio
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Documentazione
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Azienda</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Chi Siamo
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Carriere
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contatti
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legale</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Termini di Servizio
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 md:mt-12 pt-6 border-t border-border/40 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Highwheelies. Tutti i diritti riservati.
          </div>
        </div>
      </footer>
    </div>
  )
}
