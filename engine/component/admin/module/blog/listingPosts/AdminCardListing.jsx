import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AdminCardListing(props) {
  console.log("props", props);
  return (
    <section className="card">
      <p className="indexInfo">{props.id}</p>
      <button type="button" className="btn_close-topRight">
        X
      </button>
      <div className="card_content">
        <div className="card_content-info">
          <h1>{props.fr.title}</h1>
          <Link href={`/blog/${props.id}`}>
            <a>{`Accéder a ce billet de blog`}</a>
          </Link>
        </div>
        <div className="card_content-img">
          {props.img_filename && (
            <Image
              placeholder="blur"
              blurDataURL={props.imageBase64}
              src={props.imageBase64}
              alt="Et ben alors"
              width={225}
              height={150}
            />
          )}
          {!props.img_filename && (
            <Image
              src="/assets/blog/posts/placeholder.png"
              alt="lol"
              width={150}
              height={150}
            />
          )}
        </div>
      </div>
      <footer>
        <button type="button">Edit</button>
        {props.active ? (
          <button type="button">Deactive</button>
        ) : (
          <button type="button">Active</button>
        )}
        <button type="button">Repost</button>
      </footer>
    </section>
  );
}
