import { Composition } from "remotion";
import { NeonTypewriterDemo } from "../skills/neon-typewriter/demo";
import { SpatialGlassContainerDemo } from "../skills/spatial-glass-container/demo";
import { SmartCameraRigDemo } from "../skills/smart-camera-rig/demo";
import { ZAxisTransitionDemo } from "../skills/zaxis-transition/demo";
import { KineticChapterTitleDemo } from "../skills/kinetic-chapter-title/demo";
import { DataMetricCounterDemo } from "../skills/data-metric-counter/demo";
import { CyberProgressTrackerDemo } from "../skills/cyber-progress-tracker/demo";
import { MacOsGlassWindowDemo } from "../skills/macos-glass-window/demo";
import { NeonTerminalDemo } from "../skills/neon-terminal/demo";
import { ThreeDFlipContainerDemo } from "../skills/three-d-flip-container/demo";
import { HeroDeviceMockupDemo } from "../skills/hero-device-mockup/demo";
import { ConfettiBurstDemo } from "../skills/confetti-burst/demo";
import { SpatialConceptCardDemo } from "../skills/spatial-concept-card/demo";
import { InsightTextDropDemo } from "../skills/insight-text-drop/demo";
import { CyberRadarScannerDemo } from "../skills/cyber-radar-scanner/demo";
import { MetricDonutChartDemo } from "../skills/metric-donut-chart/demo";
import { TelemetryDashboardDemo } from "../skills/telemetry-dashboard/demo";
import { NeuralProcessingBoxDemo } from "../skills/neural-processing-box/demo";
import { GlobalDataRouteDemo } from "../skills/global-data-route/demo";
import { LogicPathTracerDemo } from "../skills/logic-path-tracer/demo";
import { SvgMorphingIconDemo } from "../skills/svg-morphing-icon/demo";
import { DynamicMapTracerDemo } from "../skills/dynamic-map-tracer/demo";
import { VectorSpacePlotterDemo } from "../skills/vector-space-plotter/demo";
import { BentoGridMorpherDemo } from "../skills/bento-grid-morpher/demo";
import { SpotlightGlassCardDemo } from "../skills/spotlight-glass-card/demo";
import { InlineCodeDiffDemo } from "../skills/inline-code-diff/demo";
import { ParallaxTiltContainerDemo } from "../skills/parallax-tilt-container/demo";
import { InfiniteDataMarqueeDemo } from "../skills/infinite-data-marquee/demo";
import { ProScreenshotShowcase } from "./showcases/ProScreenshotShowcase";
import { CitationOverlay } from "./showcases/CitationOverlay";
import { Effect01DeleteNoiseDemo } from "../skills/effect-01-delete-noise/demo";
import { EFFECT_01_DURATION_FRAMES } from "../skills/effect-01-delete-noise";
import { Effect02PopmartCardsDemo } from "../skills/effect-02-popmart-cards/demo";
import { EFFECT_02_DURATION_FRAMES } from "../skills/effect-02-popmart-cards";
import { Effect03AxeCategoriesDemo } from "../skills/effect-03-axe-categories/demo";
import { EFFECT_03_DURATION_FRAMES } from "../skills/effect-03-axe-categories";
import { Effect04GoldenQuoteDemo } from "../skills/effect-04-golden-quote/demo";
import { EFFECT_04_DURATION_FRAMES } from "../skills/effect-04-golden-quote";
import { Effect05CircuitNodesDemo } from "../skills/effect-05-circuit-nodes/demo";
import { EFFECT_05_DURATION_FRAMES } from "../skills/effect-05-circuit-nodes";
import { Effect06TermEvolutionDemo } from "../skills/effect-06-term-evolution/demo";
import { EFFECT_06_DURATION_FRAMES } from "../skills/effect-06-term-evolution";
import { Effect07NoiseSilenceDemo } from "../skills/effect-07-noise-silence/demo";
import { EFFECT_07_DURATION_FRAMES } from "../skills/effect-07-noise-silence";
import { Effect08GlassShatterDemo } from "../skills/effect-08-glass-shatter/demo";
import { EFFECT_08_DURATION_FRAMES } from "../skills/effect-08-glass-shatter";
import { Effect09GravityFilterDemo } from "../skills/effect-09-gravity-filter/demo";
import { EFFECT_09_DURATION_FRAMES } from "../skills/effect-09-gravity-filter";
import { Effect10LaserGatesDemo } from "../skills/effect-10-laser-gates/demo";
import { EFFECT_10_DURATION_FRAMES } from "../skills/effect-10-laser-gates";
import { Effect11SniperDeleteDemo } from "../skills/effect-11-sniper-delete/demo";
import { EFFECT_11_DURATION_FRAMES } from "../skills/effect-11-sniper-delete";
import { Effect12PromptTypewriterDemo } from "../skills/effect-12-prompt-typewriter/demo";
import { EFFECT_12_DURATION_FRAMES } from "../skills/effect-12-prompt-typewriter";
import { Effect13DeleteValueDemo } from "../skills/effect-13-delete-value/demo";
import { EFFECT_13_DURATION_FRAMES } from "../skills/effect-13-delete-value";
import { Effect14RlhfMirrorDemo } from "../skills/effect-14-rlhf-mirror/demo";
import { EFFECT_14_DURATION_FRAMES } from "../skills/effect-14-rlhf-mirror";
import { Effect15BarnumGridDemo } from "../skills/effect-15-barnum-grid/demo";
import { EFFECT_15_DURATION_FRAMES } from "../skills/effect-15-barnum-grid";
import { Effect16PopmartShelfDemo } from "../skills/effect-16-popmart-shelf/demo";
import { EFFECT_16_DURATION_FRAMES } from "../skills/effect-16-popmart-shelf";
import { Effect17MemoryFunnelDemo } from "../skills/effect-17-memory-funnel/demo";
import { EFFECT_17_DURATION_FRAMES } from "../skills/effect-17-memory-funnel";
import { Effect18AntiBarnumFilterDemo } from "../skills/effect-18-anti-barnum-filter/demo";
import { EFFECT_18_DURATION_FRAMES } from "../skills/effect-18-anti-barnum-filter";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="NeonTypewriterDemo"
        component={NeonTypewriterDemo}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="SpatialGlassContainerDemo"
        component={SpatialGlassContainerDemo}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="SmartCameraRigDemo"
        component={SmartCameraRigDemo}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ZAxisTransitionDemo"
        component={ZAxisTransitionDemo}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="KineticChapterTitleDemo"
        component={KineticChapterTitleDemo}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="DataMetricCounterDemo"
        component={DataMetricCounterDemo}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CyberProgressTrackerDemo"
        component={CyberProgressTrackerDemo}
        durationInFrames={160}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="MacOsGlassWindowDemo"
        component={MacOsGlassWindowDemo}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="NeonTerminalDemo"
        component={NeonTerminalDemo}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ThreeDFlipContainerDemo"
        component={ThreeDFlipContainerDemo}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HeroDeviceMockupDemo"
        component={HeroDeviceMockupDemo}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ConfettiBurstDemo"
        component={ConfettiBurstDemo}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="SpatialConceptCardDemo"
        component={SpatialConceptCardDemo}
        durationInFrames={360}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="InsightTextDropDemo"
        component={InsightTextDropDemo}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CyberRadarScannerDemo"
        component={CyberRadarScannerDemo}
        durationInFrames={160}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="MetricDonutChartDemo"
        component={MetricDonutChartDemo}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="TelemetryDashboardDemo"
        component={TelemetryDashboardDemo}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="NeuralProcessingBoxDemo"
        component={NeuralProcessingBoxDemo}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="GlobalDataRouteDemo"
        component={GlobalDataRouteDemo}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="LogicPathTracerDemo"
        component={LogicPathTracerDemo}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="SvgMorphingIconDemo"
        component={SvgMorphingIconDemo}
        durationInFrames={160}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="DynamicMapTracerDemo"
        component={DynamicMapTracerDemo}
        durationInFrames={200}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="VectorSpacePlotterDemo"
        component={VectorSpacePlotterDemo}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BentoGridMorpherDemo"
        component={BentoGridMorpherDemo}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="SpotlightGlassCardDemo"
        component={SpotlightGlassCardDemo}
        durationInFrames={200}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="InlineCodeDiffDemo"
        component={InlineCodeDiffDemo}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ParallaxTiltContainerDemo"
        component={ParallaxTiltContainerDemo}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="InfiniteDataMarqueeDemo"
        component={InfiniteDataMarqueeDemo}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ProScreenshotShowcase"
        component={ProScreenshotShowcase}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CitationOverlay"
        component={CitationOverlay}
        durationInFrames={355}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Effect01DeleteNoise"
        component={Effect01DeleteNoiseDemo}
        durationInFrames={EFFECT_01_DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Effect02PopmartCards"
        component={Effect02PopmartCardsDemo}
        durationInFrames={EFFECT_02_DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Effect03AxeCategories"
        component={Effect03AxeCategoriesDemo}
        durationInFrames={EFFECT_03_DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Effect04GoldenQuote"
        component={Effect04GoldenQuoteDemo}
        durationInFrames={EFFECT_04_DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Effect05CircuitNodes"
        component={Effect05CircuitNodesDemo}
        durationInFrames={EFFECT_05_DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Effect06TermEvolution"
        component={Effect06TermEvolutionDemo}
        durationInFrames={EFFECT_06_DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Effect07NoiseSilence"
        component={Effect07NoiseSilenceDemo}
        durationInFrames={EFFECT_07_DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Effect08GlassShatter"
        component={Effect08GlassShatterDemo}
        durationInFrames={EFFECT_08_DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Effect09GravityFilter"
        component={Effect09GravityFilterDemo}
        durationInFrames={EFFECT_09_DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Effect10LaserGates"
        component={Effect10LaserGatesDemo}
        durationInFrames={EFFECT_10_DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Effect11SniperDelete"
        component={Effect11SniperDeleteDemo}
        durationInFrames={EFFECT_11_DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Effect12PromptTypewriter"
        component={Effect12PromptTypewriterDemo}
        durationInFrames={EFFECT_12_DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Effect13DeleteValue"
        component={Effect13DeleteValueDemo}
        durationInFrames={EFFECT_13_DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Effect14RlhfMirror"
        component={Effect14RlhfMirrorDemo}
        durationInFrames={EFFECT_14_DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Effect15BarnumGrid"
        component={Effect15BarnumGridDemo}
        durationInFrames={EFFECT_15_DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Effect16PopmartShelf"
        component={Effect16PopmartShelfDemo}
        durationInFrames={EFFECT_16_DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Effect17MemoryFunnel"
        component={Effect17MemoryFunnelDemo}
        durationInFrames={EFFECT_17_DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Effect18AntiBarnumFilter"
        component={Effect18AntiBarnumFilterDemo}
        durationInFrames={EFFECT_18_DURATION_FRAMES}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
