# SchoolProject

Dit is een schoolproject voor het Bataafs Lyceum in Hengelo, OV, Nederland.

# upload geschiedenis
[link](https://github.com/Marten-Mrfc/SchoolProject/commits/main/)

# Hoe voer je deze website uit?

1. Klik op de groene "code" knop bovenaan de website en download het als een zip-bestand.
2. Pak het zip-bestand uit.
3. Zorg ervoor dat je Node.js geïnstalleerd hebt op je computer. Je kunt het eenvoudig installeren vanuit de Microsoft Store.
4. Open de "Node.js Command Prompt", dit opent een zwart-wit console-achtig menu.
5. Hopelijk is het zip-bestand uitgepakt in de "Downloads" map. Open die map en vervolgens de "SchoolProject-main" map erin.
6. Klik nu op de adresbalk bovenaan, die iets zou moeten zeggen als "Downloads > SchoolProject-main > SchoolProject-main". Kopieer alles binnen die adresbalk.
7. Open de command prompt en voer het commando `cd ` gevolgd door de gekopieerde tekst in, druk dan op `enter`.
8. Voer het commando `npm start` uit en het programma zou moeten starten.
9. Open je favoriete browser (bijv. Google Chrome) en voer `http://localhost:3000` in om toegang te krijgen tot de website.
10. Voer de klasnaam `m2a` in en de website zou correct moeten werken.


#	 Start
In de startfase van m'n onderzoek ga ik checken waarom scholieren zo'n stress hebben als ze toetsen maken.

#	 Ontdekken
Ik ben gaan kijken wat het probleem is, en veel scholieren hebben stress door te veel toetsen. In de klas waar ik naar keek, hadden ze ongeveer 2,5 toetsen per week. Dat is veel, elke week 2 tot 3 toetsen maken is echt druk. Ik wil uitzoeken hoe we dit kunnen aanpakken zodat scholieren minder stress hebben tijdens toetsen. 

#	Duiden
Veel toetsen in een week = veel stress

#	Idee ontwikkelen
Als idee heb ik een programma maken om ervoor te zorgen dat de roostermaker en leerlingen kunnen zien hoe stressvol een week kan zijn voor een leerling als hun veel toetsen moeten maken. Ik zal de features:

•	Cijferaangever: cijfer op basis van de hoeveelheid toetsen

•	Reactie van leerling: Reacties van leerlingen doormiddel van een vragenlijst

•	Verschillende klassen: Je kan zien wat andere klassen voor een week hebben

•	Thema-switcher: Voor als je meer van een donker thema houdt

•	Built-in toets switcher: pas de toets van die dag aan in de website

#	Maken

Ik begon met het kiezen van de codeertalen daarvoor kies ik ervoor om voor server-side: Node.Js te kiezen en voor client-side: EJS
1.	Static website: Ik begon met het maken van een static website hierin werkt niks nog en maak je alleen een design. Dit design gaf ik aan bij klasgenoten en die vonden na wat kleine aanpassingen het er mooi uit zien

2.	Server-side: Daarna ging ik bezig met het maken van de server-side code hierbij waren 2 dingen belangrijk
    1.	Het inladen van de data: Ervoor zorgen dat wanneer je de pagina laad je ook alles te zien krijgt uit timetables.json.
    2.	Het aanpassen van de data: Als je iets aanpast dat de website een aanpassing naar de server stuurt om de timetables.json aan te passen.

3.	Client-side: nu was het tijd om met de ejs ervoor de zorgen dat de pagina wanneer die wordt geladen een verzoek naar de server stuurt om de data te krijgen maar daarna ook alles mooi te laten zien. Dit verloop aardig moeilijk maar uiteindelijk is het gaan werken en zag het er mooi uit

4.	Cijfer systeem: Toen ik feedback begon te vragen kwam meneer Huiskes om toe te voegen dat je kan zien hoe moeilijk de week is door een cijfer + kleur te laten zien dus ik voegde dit toe en werkte goed uit.

5.	Reactie systeem: Meneer Huiskes kwam ook met de tip om reacties te laten zien per cijfer en kleur. Dus ik ging daar mee aan de slag en ging een google form maken en liet onze klas die invullen elke vraag was een beetje zoals `Wat is je reactie als je een 1 als cijfer zou hebben` met die reacties heb ik alles in een reactions.json in het formaat cijfer: (lijst met reacties) daarna was het nog tijd om het systeem in de server te stoppen en dat was een grote klus omdat het maar niet wou laden of andere dingen kapot maakte.

6.	Styling/thema’s: Als laatste ging ik de CSS verbeteren hiermee kan ik de site er mooi laten uitzien. Ik wou 2 thema’s doen licht en donker dus ik ging hiermee aan het werk rechtsboven zit een schuifje waar je kan switchen tussen de 2 thema’s. 


#	 Feedback
Tijdens dit project heb ik ten alle tijden feedback van leerlingen en docenten gevraagd dit heeft ervoor gezorgd dat er zelfs meerde nieuwe dingen kwamen waar ik in eerste instantie nog helemaal niet over na had gedacht. Ook kwamen er vaak tips over het uiterlijk en design van de website en dat heeft uiteindelijk tot het eindresultaat geleid.

#	Verankering
Uiteindelijk heb ik tijdens dit project vele nieuwe dingen geleerd ik heb vooral mijn kennis over de site Github verbeterd maar ook nieuwe dingen geleerd zoals dingen opslaan in cookies en dat het belangrijk is om een duidelijke layout te hebben in de website maar ook in de code zelf.