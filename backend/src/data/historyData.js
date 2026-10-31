export const historyData = [
  {
    countryCode: 'IND', countryName: 'India', updatedAt: '2026-08-01T00:00:00.000Z',
    overview: 'India’s long history spans early urban civilizations, diverse kingdoms and empires, colonial rule, a mass independence movement, and the creation of the world’s largest democracy.',
    events: [
      { id: 'ind-indus', year: 'c. 2600–1900 BCE', title: 'The Indus civilization flourishes', description: 'Large, carefully planned cities including Harappa and Mohenjo-daro became centers of one of the ancient world’s earliest urban civilizations.', sources: [{ label: 'Encyclopaedia Britannica', url: 'https://www.britannica.com/topic/Indus-civilization' }] },
      { id: 'ind-independence', year: '1947', title: 'Independence and Partition', description: 'British rule ended in August 1947, accompanied by the partition of British India into India and Pakistan and major population displacement.', sources: [{ label: 'UK Parliament', url: 'https://www.parliament.uk/about/living-heritage/evolutionofparliament/legislativescrutiny/parliament-and-empire/parliament-and-the-american-colonies-before-1765/the-commonwealth/india/' }] },
      { id: 'ind-republic', year: '1950', title: 'The Constitution takes effect', description: 'India’s Constitution came into force on 26 January 1950, establishing the country as a sovereign democratic republic.', sources: [{ label: 'Legislative Department of India', url: 'https://legislative.gov.in/constitution-of-india/' }] },
    ], sources: [{ label: 'National Archives of India', url: 'https://nationalarchives.nic.in/' }],
  },
  {
    countryCode: 'JPN', countryName: 'Japan', updatedAt: '2026-08-01T00:00:00.000Z',
    overview: 'Japan’s history reflects centuries of court culture and warrior government, rapid modernization during the Meiji era, and democratic reconstruction after the Second World War.',
    events: [
      { id: 'jpn-heian', year: '794', title: 'The capital moves to Heian-kyō', description: 'The imperial capital moved to present-day Kyoto, beginning the Heian period and an influential era of court culture.', sources: [{ label: 'Encyclopaedia Britannica', url: 'https://www.britannica.com/event/Heian-period' }] },
      { id: 'jpn-meiji', year: '1868', title: 'The Meiji Restoration', description: 'Political authority was formally restored to the emperor, opening a period of sweeping institutional, economic, and military modernization.', sources: [{ label: 'National Diet Library', url: 'https://www.ndl.go.jp/constitution/e/etc/c02.html' }] },
      { id: 'jpn-constitution', year: '1947', title: 'A new constitution takes effect', description: 'Japan’s postwar Constitution established popular sovereignty, fundamental rights, and a parliamentary system under a symbolic emperor.', sources: [{ label: 'Prime Minister of Japan', url: 'https://japan.kantei.go.jp/constitution_and_government_of_japan/constitution_e.html' }] },
    ], sources: [{ label: 'National Diet Library', url: 'https://www.ndl.go.jp/en/' }],
  },
  {
    countryCode: 'FRA', countryName: 'France', updatedAt: '2026-08-01T00:00:00.000Z',
    overview: 'France’s political and cultural development has influenced Europe and the wider world, from medieval monarchy through revolution, republic, empire, and modern European integration.',
    events: [
      { id: 'fra-revolution', year: '1789', title: 'The French Revolution begins', description: 'A political and social crisis transformed France, challenged absolute monarchy, and advanced enduring ideas about citizenship and rights.', sources: [{ label: 'Encyclopaedia Britannica', url: 'https://www.britannica.com/event/French-Revolution' }] },
      { id: 'fra-republic', year: '1870', title: 'The Third Republic is proclaimed', description: 'Following defeat in the Franco-Prussian War, a republic was proclaimed in Paris and developed into France’s longest-lasting republican regime to that date.', sources: [{ label: 'Élysée', url: 'https://www.elysee.fr/en/french-presidency/the-presidents-of-the-republic' }] },
      { id: 'fra-fifth', year: '1958', title: 'The Fifth Republic is founded', description: 'A new constitution created the Fifth Republic and strengthened the executive branch, forming the basis of France’s present constitutional system.', sources: [{ label: 'French Constitutional Council', url: 'https://www.conseil-constitutionnel.fr/en/constitution-of-4-october-1958' }] },
    ], sources: [{ label: 'Archives nationales', url: 'https://www.archives-nationales.culture.gouv.fr/en/web/guest/home' }],
  },
  {
    countryCode: 'DEU', countryName: 'Germany', updatedAt: '2026-08-01T00:00:00.000Z',
    overview: 'Germany’s modern history encompasses national unification, dictatorship and war, postwar division, democratic renewal, and peaceful reunification at the end of the Cold War.',
    events: [
      { id: 'deu-unification', year: '1871', title: 'The German Empire is founded', description: 'Most German states were united into a nation-state under Prussian leadership following the Franco-Prussian War.', sources: [{ label: 'German Historical Museum', url: 'https://www.dhm.de/lemo/chapter/kaiserreich' }] },
      { id: 'deu-basic-law', year: '1949', title: 'The Basic Law comes into force', description: 'The Basic Law established the Federal Republic of Germany as a democratic and federal state committed to human dignity and fundamental rights.', sources: [{ label: 'German Bundestag', url: 'https://www.bundestag.de/en/parliament/function/legal/german_basic_law-245216' }] },
      { id: 'deu-reunification', year: '1990', title: 'Germany is reunified', description: 'The German Democratic Republic acceded to the Federal Republic on 3 October 1990, restoring German unity after four decades of division.', sources: [{ label: 'German Federal Government', url: 'https://www.bundesregierung.de/breg-en/issues/german-unity' }] },
    ], sources: [{ label: 'German Historical Museum', url: 'https://www.dhm.de/en/' }],
  },
  {
    countryCode: 'USA', countryName: 'United States', updatedAt: '2026-08-01T00:00:00.000Z',
    overview: 'The United States emerged from thirteen British colonies and developed through constitutional government, territorial expansion, civil war, industrialization, and continuing movements to extend civil rights.',
    events: [
      { id: 'usa-declaration', year: '1776', title: 'The Declaration of Independence', description: 'Delegates to the Continental Congress adopted the Declaration of Independence on 4 July, announcing the colonies’ separation from Great Britain.', sources: [{ label: 'U.S. National Archives', url: 'https://www.archives.gov/founding-docs/declaration' }] },
      { id: 'usa-constitution', year: '1787', title: 'The Constitution is signed', description: 'Delegates signed the Constitution in Philadelphia, proposing a new federal system that took effect after state ratification.', sources: [{ label: 'U.S. National Archives', url: 'https://www.archives.gov/founding-docs/constitution' }] },
      { id: 'usa-civil-rights', year: '1964', title: 'The Civil Rights Act becomes law', description: 'The Civil Rights Act prohibited discrimination in major areas of public life and strengthened federal enforcement against segregation.', sources: [{ label: 'U.S. Senate', url: 'https://www.senate.gov/artandhistory/history/civil_rights/civil_rights.htm' }] },
    ], sources: [{ label: 'U.S. National Archives', url: 'https://www.archives.gov/' }],
  },
];
