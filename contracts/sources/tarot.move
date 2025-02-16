module admin::tarot {

    //==============================================================================================
    // Dependencies
    //==============================================================================================

    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::coin;
    use aptos_framework::account::{Self, SignerCapability};
    use std::signer;
    use std::string::{Self, String};
    use std::vector;
    use aptos_token_objects::token;
    use aptos_token_objects::royalty;
    use aptos_token_objects::collection;
    use aptos_framework::option;
    use aptos_framework::event;
    use std::string_utils;
    use std::object;
    use aptos_framework::timestamp;
    use aptos_token_objects::property_map;
    use std::bcs;
    use aptos_framework::block;

    #[test_only]
    use aptos_framework::aptos_coin::{Self};

    //==============================================================================================
    // Errors
    //==============================================================================================

    const ERROR_SIGNER_NOT_ADMIN: u64 = 0;
    const ERROR_INSUFFICIENT_BALANCE: u64 = 1;
    const ERROR_OTHER: u64 = 2;

    //==============================================================================================
    // Constants
    //==============================================================================================

    // Seed for resource account creation
    const SEED: vector<u8> = b"tarot";

    //The minimum price of minting a reading, in APT.
    const MINTING_PRICE: u64 = 10000000; //0.1
    //The minimum price of getting a reading, in APT.
    const READING_PRICE: u64 = 10000000; //0.1

    // NFT collection information
    const COLLECTION_NAME: vector<u8> = b"ART3MIS_TAROT";
    const COLLECTION_DESCRIPTION: vector<u8> = b"Art3misOracle Tarot, powered by Aptos Randomness";
    const COLLECTION_URI: vector<u8> = b"ipfs://bafybeihwfoxpqtks7625ut64ka6jgpc3j6nscha4cwtzerlfttd4pizcdq/cover.png";

    const MAJOR_ARCANA_CARD_URI_UPRIGHT: vector<u8> = b"ipfs://bafybeiel3ftyc3pkjfnb5dseioeuoewr5xqqpxqyb2737e4shfkvnbrkuy/";
    const MAJOR_ARCANA_CARD_URI_REVERSE: vector<u8> = b"ipfs://bafybeibktknj7ztgmtts6y7mhdi2obvfvdotqochsqawlimicsguauygcu/";


    const MAJOR_ARCANA_NAME: vector<vector<u8>> = vector[
       (b"0 The Fool"),
        (b"I The Magician"),
        (b"II The High Priestess"),
        (b"III The Empress"),
        (b"IV The Emperor"),
        (b"V The Hierophant"),
        (b"VI The Lovers"),
        (b"VII The Chariot"),
        (b"VIII Strength"),
        (b"IX The Hermit"),
        (b"X The Wheel of Fortune"),
        (b"XI Justice"),
        (b"XII The Hanged Man"),
        (b"XIII Death"),
        (b"XIV Temperance"),
        (b"XV The Devil"),
        (b"XVI The Tower"),
        (b"XVII The Star"),
        (b"XVIII The Moon"),
        (b"XIX The Sun"),
        (b"XX Judgement"),
        (b"XXI The World")
    ];

    const PROPERTY_KEY: vector<vector<u8>> = vector[
        b"PROPERTY_KEY_TOKEN_NAME",
        b"PROPERTY_KEY_CARD_NAME",
        b"PROPERTY_KEY_CARD_POSITION",
        b"PROPERTY_KEY_QUESTION",
        b"PROPERTY_KEY_READING",
        b"PROPERTY_KEY_TIMESTAMP"
    ];

    //==============================================================================================
    // Module Structs
    //==============================================================================================

    /// contains details of each Tarot Reading.
    struct Reading has store, key {
        // Used for editing the token data
        mutator_ref: token::MutatorRef,
        // Used for burning the token
        burn_ref: token::BurnRef,
        // Used for editing the token's property_map
        property_mutator_ref: property_map::MutatorRef,
    }

    /*
    Information to be used in the module
*/
    struct State has key {
        // signer cap of the module's resource account
        signer_cap: SignerCapability,
        //count
        minted: u64,
        // Events
        reading_minted_events: u64,
    }

    //==============================================================================================
    // Event structs
    //==============================================================================================
    #[event]
    struct ReadingMintedEvent has store, drop {
        // user
        user: address,
        // reading nft object address
        reading: address,
        // timestamp
        timestamp: u64
    }

    #[event]
    struct CardDrawnEvent has store, drop {
        // card
        card: String,
        // card image
        card_uri: String,
        // upright/reverse
        position: String
    }
    //==============================================================================================
    // Functions
    //==============================================================================================

    fun init_module(admin: &signer) {
        assert_admin(signer::address_of(admin));
        let (resource_signer, resource_cap) = account::create_resource_account(admin, SEED);

        let royalty = royalty::create(5,100,@treasury);
        // Create an NFT collection with an unlimited supply and the following aspects:
        collection::create_unlimited_collection(
            &resource_signer,
            string::utf8(COLLECTION_DESCRIPTION),
            string::utf8(COLLECTION_NAME),
            option::some(royalty),
            string::utf8(COLLECTION_URI)
        );

        // Create the State global resource and move it to the admin account
        let state = State{
            signer_cap: resource_cap,
            minted: 0,
            reading_minted_events: 0
        };
        move_to<State>(admin, state);
    }

    #[view]
    public fun draws_card(): String{
        // Pick a random card between 0 to 21
        let card_no = random(22);
        let card = string::utf8(*vector::borrow(&MAJOR_ARCANA_NAME, card_no));
        // 0 = upright, 1 = reverse
        let position =
            if(random(2) == 0){
                string::utf8(b"upright")
            }else{string::utf8(b"reverse")};
        let card_uri = if(position == string::utf8(b"upright")){
            string::utf8(MAJOR_ARCANA_CARD_URI_UPRIGHT)
            }else{
                string::utf8(MAJOR_ARCANA_CARD_URI_REVERSE)
                };
        string::append(&mut card_uri, string_utils::format1(&b"{}.png", card_no));
        let output = card;
        string::append(&mut output, string::utf8(b", "));
        string::append(&mut output, position);
        event::emit(CardDrawnEvent {
            card,
            card_uri,
            position
        });
        output
    }

    public entry fun mint_card(
        user: &signer,
        question: String,
        reading: String,
        card: String,
        position: String
    ) acquires State {
        let user_add = signer::address_of(user);
        // check_if_user_has_enough_apt(user_add);
        // // Payment
        // coin::transfer<AptosCoin>(user, @treasury, MINTING_PRICE);
        let state = borrow_global_mut<State>(@admin);
        let res_signer = account::create_signer_with_capability(&state.signer_cap);
        let (_found, card_no) = vector::find(&MAJOR_ARCANA_NAME, |obj|{
            let c: &vector<u8> = obj;
            string::bytes(&card) == c
        });
        let royalty = royalty::create(5,100,@treasury);
        let token_uri = if(position == string::utf8(b"upright")){
            string::utf8(MAJOR_ARCANA_CARD_URI_UPRIGHT)
            }else{
                string::utf8(MAJOR_ARCANA_CARD_URI_REVERSE)
                };
        string::append(&mut token_uri, string_utils::format1(&b"{}.png", card_no));
        let token_name = string_utils::format1(&b"Art3mis_Tarot #{}", state.minted + 1);
        // Create a new named token:
        let token_const_ref = token::create_named_token(
            &res_signer,
            string::utf8(COLLECTION_NAME),
            reading,
            token_name,
            option::some(royalty),
            token_uri
        );
        let obj_signer = object::generate_signer(&token_const_ref);
        let obj_add = object::address_from_constructor_ref(&token_const_ref);

        // Transfer the token to the user account
        object::transfer_raw(&res_signer, obj_add, user_add);

        // Create the property_map for the new token with the following properties:
        //          - PROPERTY_KEY_TOKEN_NAME
        //          - PROPERTY_KEY_CARD_NAME
        //          - PROPERTY_KEY_CARD_POSITION
        //          - PROPERTY_KEY_QUESTION
        //          - PROPERTY_KEY_READING
        //          - PROPERTY_KEY_TIMESTAMP
        let prop_keys = vector[
            string::utf8(*vector::borrow(&PROPERTY_KEY,0)),
            string::utf8(*vector::borrow(&PROPERTY_KEY,1)),
            string::utf8(*vector::borrow(&PROPERTY_KEY,2)),
            string::utf8(*vector::borrow(&PROPERTY_KEY,3)),
            string::utf8(*vector::borrow(&PROPERTY_KEY,4)),
            string::utf8(*vector::borrow(&PROPERTY_KEY,5))
        ];

        let prop_types = vector[
            string::utf8(b"0x1::string::String"),
            string::utf8(b"0x1::string::String"),
            string::utf8(b"0x1::string::String"),
            string::utf8(b"0x1::string::String"),
            string::utf8(b"0x1::string::String"),
            string::utf8(b"u64"),
        ];

        let now = timestamp::now_seconds();
        let prop_values = vector[
            bcs::to_bytes(&token_name),
            bcs::to_bytes(&card),
            bcs::to_bytes(&position),
            bcs::to_bytes(&question),
            bcs::to_bytes(&reading),
            bcs::to_bytes(&now)
        ];

        let token_prop_map = property_map::prepare_input(prop_keys,prop_types,prop_values);
        property_map::init(&token_const_ref,token_prop_map);

        // Create the ErebrusToken object and move it to the new token object signer
        let new_nft_token = Reading {
            mutator_ref: token::generate_mutator_ref(&token_const_ref),
            burn_ref: token::generate_burn_ref(&token_const_ref),
            property_mutator_ref: property_map::generate_mutator_ref(&token_const_ref),
        };

        move_to<Reading>(&obj_signer, new_nft_token);

        state.minted = state.minted + 1;

        // Emit a new ReadingMintedEvent
        event::emit(ReadingMintedEvent{
            user: user_add,
            reading: obj_add,
            timestamp: now
        });
        state.reading_minted_events = state.reading_minted_events + 1;
    }

    //==============================================================================================
    // Helper functions
    //==============================================================================================

    fun random(upper: u64): u64{
        let seed = (block::get_current_block_height()+timestamp::now_microseconds())/1000;
        let x = seed / upper;
        seed - x*upper
    }

    //==============================================================================================
    // View functions
    //==============================================================================================

    #[view]
    public fun get_collection_address(): address acquires State {
        let state = borrow_global_mut<State>(@admin);
        collection::create_collection_address(
            &signer::address_of(&account::create_signer_with_capability(&state.signer_cap)),
            &string::utf8(COLLECTION_NAME)
        )
    }

    //==============================================================================================
    // Validation functions
    //==============================================================================================

    inline fun assert_admin(admin: address) {
        assert!(admin == @admin, ERROR_SIGNER_NOT_ADMIN);
    }

    inline fun check_if_user_has_enough_apt(user: address) {
        assert!(coin::balance<AptosCoin>(user) >= MINTING_PRICE, ERROR_INSUFFICIENT_BALANCE);
    }

    //==============================================================================================
    // Test functions
    //==============================================================================================


    #[test(admin = @admin)]
    fun test_init_module_success(
        admin: &signer
    ) acquires State {
        let admin_address = signer::address_of(admin);
        account::create_account_for_test(admin_address);

        let aptos_framework = account::create_account_for_test(@aptos_framework);
        timestamp::set_time_has_started_for_testing(&aptos_framework);

        init_module(admin);

        let expected_resource_account_address = account::create_resource_address(&admin_address, SEED);
        assert!(account::exists_at(expected_resource_account_address), 0);

        let state = borrow_global<State>(admin_address);
        assert!(
            account::get_signer_capability_address(&state.signer_cap) == expected_resource_account_address,
            0
        );

        let expected_collection_address = collection::create_collection_address(
            &expected_resource_account_address,
            &string::utf8(COLLECTION_NAME)
        );
        let collection_object = object::address_to_object<collection::Collection>(expected_collection_address);
        assert!(
            collection::creator<collection::Collection>(collection_object) == expected_resource_account_address,
            4
        );
        assert!(
            collection::name<collection::Collection>(collection_object) == string::utf8(COLLECTION_NAME),
            4
        );
        assert!(
            collection::description<collection::Collection>(collection_object) == string::utf8(COLLECTION_DESCRIPTION),
            4
        );
        assert!(
            collection::uri<collection::Collection>(collection_object) == string::utf8(COLLECTION_URI),
            4
        );

        assert!(state.reading_minted_events == 0, 2);
    }

    #[test(admin = @admin, user = @0xA, treasury = @treasury)]
    fun test_mint_success(
        admin: &signer,
        user: &signer,
        treasury: &signer
    ) acquires State {
        let admin_address = signer::address_of(admin);
        let user_address = signer::address_of(user);
        let treasury_address = signer::address_of(treasury);
        account::create_account_for_test(admin_address);
        account::create_account_for_test(user_address);
        account::create_account_for_test(treasury_address);

        let aptos_framework = account::create_account_for_test(@aptos_framework);
        timestamp::set_time_has_started_for_testing(&aptos_framework);
        let (burn_cap, mint_cap) =
            aptos_coin::initialize_for_test(&aptos_framework);
            coin::register<AptosCoin>(user);
            coin::register<AptosCoin>(treasury);
            init_module(admin);
            aptos_coin::mint(&aptos_framework, user_address, MINTING_PRICE);

        let expected_image_uri = string::utf8(MAJOR_ARCANA_CARD_URI);
        string::append(&mut expected_image_uri, string_utils::format1(&b"{}.png",0));

        let resource_account_address = account::create_resource_address(&@admin, SEED);

        let question = string::utf8(b"test_question");
        let reading = string::utf8(b"you are a fool");
        let card = *vector::borrow(&MAJOR_ARCANA_NAME, 0);
        let position = string::utf8(b"upright");
        mint_card(user,question,reading,string::utf8(card),position);

        let state = borrow_global<State>(admin_address);

        let expected_nft_token_address = token::create_token_address(
            &resource_account_address,
            &string::utf8(COLLECTION_NAME),
            &string_utils::format1(&b"Art3mis_Tarot #{}", 1)
        );
        let nft_token_object = object::address_to_object<token::Token>(expected_nft_token_address);
        assert!(
            object::is_owner(nft_token_object, user_address) == true,
            1
        );
        assert!(
            token::creator(nft_token_object) == resource_account_address,
            4
        );
        assert!(
            token::name(nft_token_object) == string_utils::format1(&b"Art3mis_Tarot #{}", state.minted),
            4
        );
        assert!(
            token::description(nft_token_object) == reading,
            4
        );
        assert!(
            token::uri(nft_token_object) == expected_image_uri,
            4
        );
        assert!(
            option::is_some<royalty::Royalty>(&token::royalty(nft_token_object)),
            4
        );

        coin::destroy_burn_cap(burn_cap);
        coin::destroy_mint_cap(mint_cap);

        assert!(state.reading_minted_events == 1, 2);

    }

}
