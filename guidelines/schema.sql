CREATE TABLE `user` (
    id            INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username      VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    joined_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE media (
    id          INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id     INT          NOT NULL,
    file_path   VARCHAR(512) NOT NULL,
    uploaded_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_media_user FOREIGN KEY (user_id) REFERENCES `user`(id) ON DELETE CASCADE
);

CREATE TABLE profile (
    id              INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id         INT  NOT NULL UNIQUE,
    description     TEXT,
    banner_media_id INT  DEFAULT NULL,
    avatar_media_id INT  DEFAULT NULL,
    CONSTRAINT fk_profile_user   FOREIGN KEY (user_id)         REFERENCES `user`(id)  ON DELETE CASCADE,
    CONSTRAINT fk_profile_banner FOREIGN KEY (banner_media_id) REFERENCES media(id)   ON DELETE SET NULL,
    CONSTRAINT fk_profile_avatar FOREIGN KEY (avatar_media_id) REFERENCES media(id)   ON DELETE SET NULL
);

CREATE TABLE collection (
    id          INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    profile_id  INT          NOT NULL,
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_public   TINYINT(1)   NOT NULL DEFAULT 1,
    CONSTRAINT fk_collection_profile FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE
);

CREATE TABLE card (
    id               INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    collection_id    INT          NOT NULL,
    title            VARCHAR(255) NOT NULL,
    description      TEXT,
    picture_media_id INT          DEFAULT NULL,
    is_tradeable     TINYINT(1)   NOT NULL DEFAULT 0,
    created_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_card_collection FOREIGN KEY (collection_id)    REFERENCES collection(id) ON DELETE CASCADE,
    CONSTRAINT fk_card_media      FOREIGN KEY (picture_media_id) REFERENCES media(id)      ON DELETE SET NULL
);

CREATE TABLE followers (
    id          INT      NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id     INT      NOT NULL,
    follower_id INT      NOT NULL,
    followed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_followers (user_id, follower_id),
    CONSTRAINT chk_followers_no_self CHECK (user_id <> follower_id),
    CONSTRAINT fk_followers_user     FOREIGN KEY (user_id)     REFERENCES `user`(id) ON DELETE CASCADE,
    CONSTRAINT fk_followers_follower FOREIGN KEY (follower_id) REFERENCES `user`(id) ON DELETE CASCADE
);

CREATE TABLE trade_offer (
    id           INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    from_user_id INT          NOT NULL,
    to_user_id   INT          NOT NULL,
    status       VARCHAR(50)  NOT NULL DEFAULT 'pending',
    message      TEXT,
    created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_trade_offer_status   CHECK (status IN ('pending', 'accepted', 'declined', 'cancelled')),
    CONSTRAINT chk_trade_offer_no_self  CHECK (from_user_id <> to_user_id),
    CONSTRAINT fk_trade_offer_from_user FOREIGN KEY (from_user_id) REFERENCES `user`(id) ON DELETE CASCADE,
    CONSTRAINT fk_trade_offer_to_user   FOREIGN KEY (to_user_id)   REFERENCES `user`(id) ON DELETE CASCADE
);

CREATE TABLE trade_offer_items (
    id             INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
    trade_offer_id INT         NOT NULL,
    card_id        INT         NOT NULL,
    side           VARCHAR(10) NOT NULL,
    CONSTRAINT chk_trade_offer_items_side  CHECK (side IN ('from', 'to')),
    CONSTRAINT fk_trade_offer_items_offer  FOREIGN KEY (trade_offer_id) REFERENCES trade_offer(id) ON DELETE CASCADE,
    CONSTRAINT fk_trade_offer_items_card   FOREIGN KEY (card_id)        REFERENCES card(id)        ON DELETE CASCADE
);

CREATE TABLE comments (
    id         INT      NOT NULL AUTO_INCREMENT PRIMARY KEY,
    card_id    INT      NOT NULL,
    user_id    INT      NOT NULL,
    comment    TEXT     NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comments_card FOREIGN KEY (card_id) REFERENCES card(id)    ON DELETE CASCADE,
    CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES `user`(id)  ON DELETE CASCADE
);

CREATE TABLE card_likes (
    id      INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    card_id INT NOT NULL,
    user_id INT NOT NULL,
    UNIQUE KEY uq_card_likes (card_id, user_id),
    CONSTRAINT fk_card_likes_card FOREIGN KEY (card_id) REFERENCES card(id)   ON DELETE CASCADE,
    CONSTRAINT fk_card_likes_user FOREIGN KEY (user_id) REFERENCES `user`(id) ON DELETE CASCADE
);

CREATE TABLE comment_likes (
    id         INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    comment_id INT NOT NULL,
    user_id    INT NOT NULL,
    UNIQUE KEY uq_comment_likes (comment_id, user_id),
    CONSTRAINT fk_comment_likes_comment FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
    CONSTRAINT fk_comment_likes_user    FOREIGN KEY (user_id)    REFERENCES `user`(id)   ON DELETE CASCADE
);

CREATE INDEX idx_media_user_id            ON media(user_id);
CREATE INDEX idx_profile_user_id          ON profile(user_id);
CREATE INDEX idx_collection_profile_id    ON collection(profile_id);
CREATE INDEX idx_card_collection_id       ON card(collection_id);
CREATE INDEX idx_followers_user_id        ON followers(user_id);
CREATE INDEX idx_followers_follower_id    ON followers(follower_id);
CREATE INDEX idx_trade_offer_from_user    ON trade_offer(from_user_id);
CREATE INDEX idx_trade_offer_to_user      ON trade_offer(to_user_id);
CREATE INDEX idx_trade_offer_items_offer  ON trade_offer_items(trade_offer_id);
CREATE INDEX idx_comments_card_id         ON comments(card_id);
CREATE INDEX idx_comments_user_id         ON comments(user_id);
CREATE INDEX idx_card_likes_card_id       ON card_likes(card_id);
CREATE INDEX idx_card_likes_user_id       ON card_likes(user_id);
CREATE INDEX idx_comment_likes_comment_id ON comment_likes(comment_id);
