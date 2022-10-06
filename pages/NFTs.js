import NFTCollection from "../components/NFTs/NFTCollection";
import RewardCollection from "../components/NFTs/RewardCollection";

export default function NFTPage(props) {
  return (
    <div className="pgContain">
      <div className="main">
        <div className="nfts">
          <NFTCollection />
          <RewardCollection />
        </div>
      </div>
    </div>
  );
}
