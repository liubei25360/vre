import { AbsoluteFill, Sequence } from "remotion";
import { DataMetricCounter } from "./DataMetricCounter";

export const DataMetricCounterDemo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={90}>
        <DataMetricCounter
          value={12400}
          prefix="活跃用户 "
          suffix=" 人"
          primaryColor="#38bdf8"
          glowColor="#38bdf8"
          fontSize="12vw"
        />
      </Sequence>
      <Sequence from={90} durationInFrames={90}>
        <DataMetricCounter
          value={48723}
          prefix="代码 "
          suffix=" 行"
          primaryColor="#4ade80"
          glowColor="#4ade80"
          fontSize="11vw"
          backgroundColor="#0a120e"
        />
      </Sequence>
      <Sequence from={180} durationInFrames={90}>
        <DataMetricCounter
          value={92.7}
          prefix="节省 "
          suffix=" 小时"
          primaryColor="#fb923c"
          glowColor="#fb923c"
          fontSize="11vw"
          backgroundColor="#120d08"
          decimals={1}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
