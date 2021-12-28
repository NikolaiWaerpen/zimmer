export interface AssetType {
  id: number;
  token_id: string;
  num_sales: number;
  background_color: null;
  image_url: string;
  image_preview_url: string;
  image_thumbnail_url: string;
  image_original_url: string;
  animation_url: null;
  animation_original_url: null;
  name: string;
  description: string;
  external_link: null;
  asset_contract: AssetContract;
  permalink: string;
  collection: Collection;
  decimals: number;
  token_metadata: string;
  owner: Creator;
  sell_orders: null;
  creator: Creator;
  traits: Trait[];
  last_sale: null;
  top_bid: null;
  listing_date: null;
  is_presale: boolean;
  transfer_fee_payment_token: null;
  transfer_fee: null;
  related_assets: any[];
  orders: any[];
  auctions: any[];
  supports_wyvern: boolean;
  top_ownerships: TopOwnership[];
  ownership: null;
  highest_buyer_commitment: null;
}

interface AssetContract {
  address: string;
  asset_contract_type: string;
  created_date: Date;
  name: string;
  nft_version: string;
  opensea_version: null;
  owner: number;
  schema_name: string;
  symbol: string;
  total_supply: string;
  description: string;
  external_link: string;
  image_url: string;
  default_to_fiat: boolean;
  dev_buyer_fee_basis_points: number;
  dev_seller_fee_basis_points: number;
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: number;
  opensea_seller_fee_basis_points: number;
  buyer_fee_basis_points: number;
  seller_fee_basis_points: number;
  payout_address: string;
}

interface Collection {
  payment_tokens: PaymentToken[];
  primary_asset_contracts: AssetContract[];
  traits: Traits;
  stats: { [key: string]: number };
  banner_image_url: string;
  chat_url: null;
  created_date: Date;
  default_to_fiat: boolean;
  description: string;
  dev_buyer_fee_basis_points: string;
  dev_seller_fee_basis_points: string;
  discord_url: string;
  display_data: DisplayData;
  external_url: string;
  featured: boolean;
  featured_image_url: string;
  hidden: boolean;
  safelist_request_status: string;
  image_url: string;
  is_subject_to_whitelist: boolean;
  large_image_url: string;
  medium_username: null;
  name: string;
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: string;
  opensea_seller_fee_basis_points: string;
  payout_address: string;
  require_email: boolean;
  short_description: null;
  slug: string;
  telegram_url: null;
  twitter_username: string;
  instagram_username: string;
  wiki_url: null;
}

interface DisplayData {
  card_display_style: string;
}

interface PaymentToken {
  id: number;
  symbol: string;
  address: string;
  image_url: string;
  name: string;
  decimals: number;
  eth_price: number;
  usd_price: number;
}

interface Traits {}

interface Creator {
  user: User;
  profile_img_url: string;
  address: string;
  config: string;
}

interface User {
  username: string;
}

interface TopOwnership {
  owner: Creator;
  quantity: string;
}

interface Trait {
  trait_type: string;
  value: string;
  display_type: null;
  max_value: null;
  trait_count: number;
  order: null;
}
