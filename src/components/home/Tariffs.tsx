"use client";

import { FC, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Container from "../ui/Container";
import clsx from "clsx";
import Button from "../ui/Button";
import { useModal } from "@/providers/ModalProvider";
import Form from "./Form";
import { getPosts, Post } from "@/api/posts";

interface Tariff {
  title: string;
  price: {
    auctionPrice: string;
    oldPrice: string;
  };
  aboutList: string[];
  button: string;
}

const listOfPrices: { auctionPrice: number; oldPrice: number }[] = [
  { auctionPrice: 99, oldPrice: 139 },
  {
    auctionPrice: 149,
    oldPrice: 199,
  },
  {
    auctionPrice: 299,
    oldPrice: 500,
  },
];

const Tariffs = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [start, setStart] = useState<number>(0);
  const [hasMore, setHasMore] = useState(true);
  const postsPerPage = 3;

  const t = useTranslations("Tariffs");

  const listOfTariffs: Tariff[] = t.raw("listOfTariffs");

  const { openModal } = useModal();

  const loadPosts = async (startIndex: number, limit: number) => {
    const newPosts = await getPosts(limit, startIndex);

    if (newPosts.length < limit) {
      setHasMore(false);
    }

    setPosts((prev) => [...prev, ...newPosts]);
    setStart((prev) => prev + limit);
  };

  useEffect(() => {
    loadPosts(0, postsPerPage);
  }, []);

  const handleLoadMore = () => loadPosts(start, postsPerPage);

  const postStyles = [
    "item-radials text-white shadow-inset-custom",
    "bg-white text-jaguar 2xl:mt-0",
    "bg-lg1 text-white",
  ];

  return (
    <section className="tariffs-bg py-[66px] xl:py-25">
      <Container>
        <div className="flex flex-col gap-y-7 lg:gap-y-[79px]">
          <h2 className="uppercase font-bold text-2xl lg:text-5xl text-center">
            {t("title")}
          </h2>

          <ul className="mx-auto 2xl:mx-0 md:max-w-3/4 2xl:max-w-full w-full grid 2xl:grid-cols-3 gap-y-[26px] 2xl:gap-x-5">
            {listOfTariffs.map((item, index) => (
              <li
                key={`0${index}`}
                className={clsx(
                  "rounded-[28px] p-8 lg:px-9 lg:py-6 text-black relative flex flex-col gap-y-8",
                  postStyles[index % postStyles.length],
                )}
              >
                {index === 1 && (
                  <p className="bg-lg1 uppercase font-bold text-white rounded-[18px] py-3 px-8 absolute left-1/2 -top-[30px] -translate-x-1/2 shadow-custom leading-4.5 text-nowrap">
                    Best seller
                  </p>
                )}

                <div className="flex flex-col gap-y-8 2xl:gap-y-4">
                  <div className="flex justify-between items-center">
                    <h3
                      className={clsx(
                        "uppercase font-semibold lg:text-xl",
                        index === 0 && "pt-[10px]",
                      )}
                    >
                      {item.title}
                    </h3>

                    {(index === 1 || index === 2) && (
                      <div
                        className={clsx(
                          "w-25 lg:w-[119px] h-[42px] border-4xl rounded-4xl flex justify-center items-center",
                          index === 1 ? "bg-jaguar" : "bg-white",
                        )}
                      >
                        <p
                          className={clsx(
                            "bg-lg2 bg-clip-text text-transparent uppercase font-bold text-base",
                          )}
                        >
                          {index === 1 ? "pro" : "Expert"}
                        </p>
                      </div>
                    )}
                  </div>
                  <h4 className="font-manrope font-bold flex gap-x-6">
                    <span className="text-[64px]/16 lg:text-7xl">
                      {`${listOfPrices[index].auctionPrice} $`}
                    </span>
                    <span
                      className={clsx(
                        "text-xl self-end relative before:content-[''] before:absolute before:h-[1px] before:w-[116%] before:top-1/2 before:-left-[8%]",
                        index === 0 || index === 2
                          ? "before:bg-white"
                          : "before:bg-jaguar",
                      )}
                    >
                      {`${listOfPrices[index].oldPrice} $`}
                    </span>
                  </h4>
                </div>

                <ul
                  className={clsx(
                    "uppercase text-jaguar font-semibold flex flex-col gap-y-3 ",
                    (index === 0 || index === 2) && "text-white",
                  )}
                >
                  {item.aboutList.map((aboutItem, aboutIndex) => (
                    <li
                      key={aboutIndex}
                      className={clsx(
                        "relative pl-7 before:absolute before:content-[''] before:size-4 before:rounded-full before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-jaguar",
                        (index === 0 || index === 2) && "before:bg-white",
                      )}
                    >
                      {aboutItem}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => openModal(<Form />)}
                  className={clsx(
                    "text-sm lg:text-base font-manrope font-semibold custom-transition-hover hover:cursor-pointer rounded-full py-[14px] lg:py-[17.5px] text-jaguar mt-auto",
                    (index === 0 || index === 2) && "bg-white",
                    index === 1 && "bg-jaguar text-white",
                  )}
                  text={item.button}
                />
              </li>
            ))}

            {posts.map(({ id, title, body }, index) => (
              <li
                key={id}
                className={clsx(
                  "rounded-[28px] p-8 lg:px-9 lg:py-6 text-black relative flex flex-col gap-y-8",

                  postStyles[index % postStyles.length],
                )}
              >
                <h3 className="uppercase font-semibold lg:text-xl">{title}</h3>
                <p className="text-sm lg:text-base">{body}</p>
              </li>
            ))}
          </ul>

          {hasMore && (
            <Button
              onClick={handleLoadMore}
              className="custom-transition-hover hover:cursor-pointer px-[31.5px] py-[10px] bg-lg2 rounded-full font-semibold text-base lg:text-lg mx-auto"
              text="LoadMore"
            />
          )}
        </div>
      </Container>
    </section>
  );
};

export default Tariffs;
