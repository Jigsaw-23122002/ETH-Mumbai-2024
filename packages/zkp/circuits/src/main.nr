use dep::std;

global MERKLE_DEPTH = 4;

fn main(
    signer_pub_x_key: [u8; 32],
    signer_pub_y_key: [u8; 32],
    signature: [u8; 64],
    squad_player_ids_byte_array: [[u8; 32]; 11],
    squad_points: [u8; 11] ,
    player_points_merkle_paths: [[[u8; 32]; MERKLE_DEPTH]; 11],
    final_hash: pub [u8; 32],
    squad_hash: pub [u8; 32],
    total_points: pub u8,
    address_byte_array: [u8; 20],
    time_stamp_byte_array: [u8; 32]
) {
    let valid_signature = std::ecdsa_secp256k1::verify_signature(signer_pub_x_key, signer_pub_y_key, signature, squad_hash);
    assert(valid_signature);

    for i in 0..11 {
        let computed_root: [u8; 32] = compute_merkle_root(squad_player_ids_byte_array[i], i, player_points_merkle_paths[i]);
        let generated_hash: [u8; 32] = std::hash::keccak256(concatenate_address_root_timestamp(address_byte_array, computed_root, time_stamp_byte_array), 84);
        // println(generated_hash);
        // assert(computed_root==merkle_root);
    }

    let mut calculated_total_points: u8 = 0;
    for point in squad_points {
        calculated_total_points+=point as u8;
    }
    assert(calculated_total_points == total_points);
}

fn concatenate_player_ids_with_salt(squad_player_ids: [u8; 11], player_ids_salt: [u8; 32]) -> [u8; 43] {
    let mut combined_array: [u8; 43] = [0; 43];
    for i in 0..11 {
        combined_array[i]=squad_player_ids[i];
    }
    for i in 0..32 {
        combined_array[i+11]=player_ids_salt[i];
    }
    combined_array
}

fn u8_to_u160(array: [u8]) -> Field {
    let mut conv: Field = 0;
    conv = (conv * 256) + (array[0] as Field);
    conv
}

fn compute_merkle_root(leaf: [u8; 32], leaf_index: u8, proof: [[u8; 32]; MERKLE_DEPTH]) -> [u8; 32] {
    let mut computed_hash: [u8; 32] = leaf;
    let mut idx=leaf_index;
    for i in 0..MERKLE_DEPTH {
        if idx % 2 == 0 {
            computed_hash = std::hash::keccak256(concatenate_leafs(computed_hash, proof[i]), 64);
        } else {
            computed_hash = std::hash::keccak256(concatenate_leafs(proof[i], computed_hash), 64);
        }
        idx=idx/2;
    }
    computed_hash
}

fn concatenate_leafs(leaf1: [u8; 32], leaf2: [u8; 32]) -> [u8; 64] {
    let mut arr: [u8; 64] = [0; 64];
    for i in 0..32 {
        arr[i] = leaf1[i];
        arr[i + 32] = leaf2[i];
    }
    arr
}

fn concatenate_address_root_timestamp(address: [u8; 20], root: [u8; 32], timestamp: [u8; 32]) -> [u8; 84] {
    let mut arr: [u8; 84] = [0; 84];
    for i in 0..20 {
        arr[i]=address[i];
    }
    for i in 0..32 {
        arr[i + 20] = root[i];
        arr[i + 20 + 32] = timestamp[i];
    }
    arr
}