"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrations1667546842565 = void 0;
class migrations1667546842565 {
    constructor() {
        this.name = 'migrations1667546842565';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "fullname" character varying, "encrypted_password" character varying NOT NULL, "email" character varying NOT NULL, "reset_password_token" character varying, "reset_password_sent_at" TIMESTAMP, "remember_created_at" TIMESTAMP, "current_sign_in_at" TIMESTAMP, "last_sign_in_at" TIMESTAMP, "current_sign_in_ip" character varying, "last_sign_in_ip" character varying, "sign_in_count" integer NOT NULL DEFAULT '0', "password" character varying, "password_confirmation" character varying, "locked_at" TIMESTAMP, "failed_attempts" integer NOT NULL DEFAULT '0', "unlock_token" character varying, "confirmation_token" character varying, "unconfirmed_email" character varying, "confirmed_at" TIMESTAMP, "confirmation_sent_at" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_ee6419219542371563e0592db51" UNIQUE ("reset_password_token"), CONSTRAINT "UQ_b800fd597d3e239f367bb8852df" UNIQUE ("unlock_token"), CONSTRAINT "UQ_00ef65cb563e7c32768f478d49b" UNIQUE ("confirmation_token"), CONSTRAINT "UQ_29f17c6c6424b532a3ee36e840e" UNIQUE ("unconfirmed_email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notes" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "content" character varying NOT NULL, "user_id" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_af6206538ea96c4e77e9f400c3d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_7708dcb62ff332f0eaf9f0743a7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_7708dcb62ff332f0eaf9f0743a7"`);
        await queryRunner.query(`DROP TABLE "notes"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.migrations1667546842565 = migrations1667546842565;
//# sourceMappingURL=1667546842565-migrations.js.map