// use base64::{engine, alphabet, Engine as _};

// bizarro-world base64: +/ as the first symbols instead of the last
// let alphabet =
//     alphabet::Alphabet::new("+/ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")
//     .unwrap();

// // a very weird config that encodes with padding but requires no padding when decoding...?
// let crazy_config = engine::GeneralPurposeConfig::new()
//     .with_decode_allow_trailing_bits(true)
//     .with_encode_padding(true)
//     .with_decode_padding_mode(engine::DecodePaddingMode::RequireNone);

// let crazy_engine = engine::GeneralPurpose::new(&alphabet, crazy_config);

// let encoded = crazy_engine.encode(b"abc 123");

//https://docs.rs/base64/latest/base64/

// do some weird custom base64 encoding with the config file/env thing from chatgpt