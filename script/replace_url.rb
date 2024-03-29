urls = []
File.open('2021_npb.txt') do |f|
  f.each_line do |l|
    urls << l
  end
end

Dir.glob('../content/blog/2021*').each do |dir|
  m = dir.match(/2021-(\d+)-(\d+)/)
  date = "2021/#{$1}#{$2}"
  url = urls.find{|u| u.include?(date)}
  if url
    buffer = ''
    File.open("#{dir}/index.mdx", 'r') do |f|
      buffer = f.read
    end
    buffer.sub!(/https.+/, url)
    File.open("#{dir}/index.mdx", 'w') do |f|
      f.write(buffer)
    end
  end
end