import CustomError from "components/CustomError";
import Loader from "components/Loader";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

const markdown = {
  "post-1": `
# Et Medusae amore dei poscor timuere desint

## Atque index egentes fugit

Lorem markdownum me census gessit audentem subiere nemus velamenta videre
loquebatur Stygias, aliis auras nigri moenibus raptam. Ambiguis facit, et corvo
dolorque bracchia deus et rostrisque et! Amplexu differt sua precor utque, regna
diu inter movetur, non nomine pendulaque aspergine geniti, vim fontis. Finita
postquam carinis copia, petebar illud sucosque Coronis rogum rigidum fronde
saliunt altae.

- Illo preme viribus in non umerosque vidit
- Peterem subit
- Talibus in avriga femina Cinyphii supplex conlapsamque

## In satis celeberrima quoque tumescere saevitiae pro

Quod regnumque fessum Ismenides vovistis, victor nobis, ut diem exquirere
**visuraque** tibi enim pedum **dea** tumulumque! Pariter terra tibi angues, est
nec lignum, solida duram tum sim, dat **eripite** Tmolus petendo. Focus
_proturbat_, Ithacis, praeterque. Nisi manus Stygias; fervebant haec,
**tinguebat** in remos sunt diversas superum cuius maris sinuataque quas.

    and_yottabyte.cable_dvr = 985033;
    if (pup_cold - firewallAnd(sku_phreaking_excel) + olap_pcmcia) {
        lanNetworkingResources.virtualization = 5;
    }
    if (toggle_kerning_analog == 15) {
        joystick.drm *= 31 + queryServiceRw + -3;
    } else {
        pc_encryption_up(scrolling, zero_drag_podcast, dock + 2);
    }
    var impression_server = cycleIpvCache(duplex_exbibyte(impressionDos, dot)) /
            blu_snapshot(filename, brouter_bar_keylogger, output_flaming) +
            program;

## Risere inops ille

Alimentaque somno, de vigili vestibus, videndum; ad per Lapitheia gravis! Oculos
caper furor plausit: mixta: nox Cupido dapibus devia! Tollens quod ponti, amores
veri incurva _palmite_; clamor obest percussit, ac illa, vitiaverit.

    pVrmlStation.templateCommerceError = ibm_kilohertz_markup(blacklistPortCd, 3
            / ctpDirectThin);
    var avatar_mp_shift = oasisJqueryFpu - 68 + ethernetSimmOptical * 97010 +
            exploit_cron - 47;
    if (p) {
        bash = imIde;
        software += browserWindows(gnuPromptClient * hardening_sd_bluetooth,
                srgb_key * 4, double);
    } else {
        igp.directDatabase.hyper_mp_secondary(302091, in_error_ascii(
                supercomputer, hexadecimal_compiler_minisite, frame_lag_ole));
        keyboardCpuInkjet(virtual);
        gigo_isdn.petaflops_wrap_social += d_analog_caps - storageLed(
                kibibyteWired, 5, 842470);
    }

Exit videt Notus; ille fumantiaque sequor, ne corpore dempsisse. Ingentia me
guttur oraque adest; tetigere **levis**, in dedit. Denique mentes et dabitur tu
ira iustissima, ne subito propera rura inritus cedit fixerat mansit, faciat.
Ossibus sine arcere, in aliter dicta, dixit tutus?
`,
  "post-2": `# Faciente coniuge ratis

## Forma in tempore dare

Lorem markdownum quid pictis utque etiam, est esse *non primo*. Me duris
fatentur in, divellere onerosus, acta *pedis* portus Fortuna simul! Nato inque
Phorcynidos illos, et Silenus herbas mole, non sputantem pateat est iam te fert!

1. Cereris exclamant in oculis citharam mora grator
2. In pelle porrigeret pleno Diomedis et coniunx
3. Posse tuas alter dant tantummodo
4. Mihi Iovis praeside audiat
5. Nec cuius mihi mutatur flamma carpit
6. Dic maestam modo ast fores

## Litora carmina desiderat

**Circumdata culmina**! Ficti eras, ait longi festinant quae arce, ulciscor
saepius quos domus inpensaque! Gelidi nec detque declive convivia mihi haec;
nunc di e perosam aures. Geminas nisi quem sermone sole lecto parientem, aquarum
tenere. Potae vos per dextrae, esse longoque manare praeferre sortem.

1. Corythus lymphis repulsam certa hic nolet necem
2. Colli secus dederat inmittitur orbem populisque
3. Est dixit retinens

## Minos proturbat his fluit vulnera bella

Videri *hominumque* utque Peleusque? Ut corpore; quam anima: sub puer paelicis
sicut!

## Edere cur mori si lancea pontus restant

Feris vincla quotiens rogantem vultus, **homines abunde**, qui repono proxima
relinquere consedere, inpulsumque? *Agri sepulcro et* neque. Pius neque
relinquit, usu quod, cum [sua otia sanesque](http://cum-ait.net/iove.aspx), tibi
cuspide. Miscenda licet conlocat Agamemnona multaque, ire domum!

Dicta **trepidos tu**, posita eris negarunt duobus Fortuna aliquid protinus nisi
videt *bracchia*, terrae facinus. Taceam ita cum fortunaeque datis, te a clipeus
transitus ad olentes ut ut curvos urbem Perseus Euphrates velit.`,
};

// TODO:
// SKETCH OUT SOLUTION IN FIGJAM
// STORE POSTS IN BACKEND
// THINK OUT HOW YOU WILL CREATE NEW POSTS
// POST LAYOUT -> BANNER, TOPIC, TITLE, MARKDOWN, DATE
// FRONTEND FOR CREATING POST?

export default function Post() {
  const { query, isReady } = useRouter();

  if (!isReady) return <Loader />;

  const { post } = query;

  /* @ts-ignore */
  if (typeof post !== "string" || !markdown[post]) return <CustomError />;

  return (
    <div className="flex justify-center mt-36">
      <div className="flex flex-col gap-4 prose">
        {/* @ts-ignore */}
        <ReactMarkdown children={markdown[post]} />
      </div>
    </div>
  );
}
