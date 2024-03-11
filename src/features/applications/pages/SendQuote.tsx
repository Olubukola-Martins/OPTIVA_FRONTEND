export const SendQuote = () => {
  return (
    <>
      {/* <Skeleton active loading={isLoading}> */}
      <div className="bg-[url('https://optiva-backend.techmur.com/assets/watermark.png')]  bg-contain bg-center bg-no-repeat p-2 m-3 z-10">
        <div className="flex justify-between">
          <img src="https://optiva-backend.techmur.com/assets/optivaLogo.png" />
          <p>Quote No: </p>
        </div>
        <div className="p-2">
          <h1>Mr. John Smith Doe and Family </h1>
          <p>14th Floor, Churchgate Towers 2,</p>
          <p>PC 30, Churchgate Street,</p>
          <p>Victoria Island, Lagos,</p>
          <p>Nigeria.</p>
          <p>Wednesday, September 6th, 2023.</p>
          <p>phone num</p>
          <p>email</p>
        </div>
        {/* {data?.data.map((item) => (
          <div
            className="my-3"
            dangerouslySetInnerHTML={{ __html: removeHtmlTags(item.content) }}
          />
        ))} */}
      </div>
      <img
        src="https://optiva-backend.techmur.com/assets/optivaAddr.png"
        className="my-4 py-5"
      />
      {/* <div className="flex justify-end items-center gap-5 my-4 py-5">
          <AppButton
            label="Cancel"
            type="reset"
            variant="transparent"
            // isDisabled={isSuccess}
          />
          <AppButton
            label="Save"
            type="submit"
            handleClick={handleSendEmail}
            isLoading={postLoading}
          />
        </div> */}
      {/* </Skeleton> */}
    </>
  );
};
